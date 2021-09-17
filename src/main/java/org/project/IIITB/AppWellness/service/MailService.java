package org.project.IIITB.AppWellness.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;

import com.mysql.jdbc.log.LogFactory;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.project.IIITB.AppWellness.Globals.Database;

import java.util.Properties;

import sun.rmi.runtime.Log;

public class MailService extends Database {

	String d_email = "wellnesscheck.reminder.nimhans@gmail.com";
	String d_password = "useforreminders";
	String d_host = "smtp.gmail.com";
	String d_port = "465";
	
	public MailService() {
		
	}

	// This could also be a static method of this class, and the above variables could all be static too, since 
	public void sendEmail(String dest, String subject, String body) {

		Properties props = new Properties();

		props.put("mail.smtp.user", d_email);
		props.put("mail.smtp.host", d_host);
		props.put("mail.smtp.port", d_port);
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.socketFactory.port", d_port);
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.socketFactory.fallback", "false");
		SecurityManager security = System.getSecurityManager();
		try {

			Authenticator auth = new SMTPAuthenticator();
			Session session = Session.getInstance(props, auth);
			MimeMessage msg = new MimeMessage(session);
			msg.setContent(body, "text/html; charset=utf-8");
			msg.setSubject(subject);
			msg.setFrom(new InternetAddress(d_email));
			//System.out.println("Mail Sent Sucessfully");
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(dest));
			Transport.send(msg);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	class SMTPAuthenticator extends javax.mail.Authenticator {

		public PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(d_email, d_password);
		}
	}

}
