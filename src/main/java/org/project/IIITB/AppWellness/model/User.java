package org.project.IIITB.AppWellness.model;

import java.util.ArrayList;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class User {

	protected String name;
	protected int user_id;
	protected String email;
	protected String phone;
	protected int age;
	protected String city;
	protected String work;
	protected String gender;
	protected String martial_status;
	protected String education;
	protected String best_currently;
	protected String mental_health_prof_help;
	protected String current_mental_helath_prob;
	protected String seek_mental_prof_help;
	protected String feedback1;
	protected String feedback2;
	protected String feedback3;
	protected String feedback4;
	protected String feedback5;
	protected String distress;
	protected String consult;
	protected String personal;
	protected String time;
	
	


	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public User(int user_id,String name, String email, String phone) {
		super();
		this.user_id = user_id;
		this.name= name;
		this.email = email;
		this.phone = phone;
	}

	public User(int user_id,String name, String gender, int age, String city, String work, String martial_status, String education,
			String best_currently, String mental_health_prof_help, String current_mental_helath_prob,
			String seek_mental_prof_help,String distress,String consult,String personal) {

		super();
		this.user_id = user_id;
		this.name = name;
		this.gender = gender;
		this.age = age;
		this.city = city;
		this.work = work;
		this.martial_status = martial_status;
		this.education = education;
		this.best_currently = best_currently;
		this.mental_health_prof_help = mental_health_prof_help;
		this.current_mental_helath_prob = current_mental_helath_prob;
		this.seek_mental_prof_help = seek_mental_prof_help;
		this.distress = distress;
		this.consult = consult;
		this.personal = personal;
	}
	
	public User(int user_id,String name,String feedback1,String feedback2,String time,String feedback3,String feedback4,String feedback5){
		
		super();
		this.user_id = user_id;
		this.name = name;
		this.feedback1 = feedback1;
		this.feedback2 = feedback2;
		this.time = time;
		this.feedback3 = feedback3;
		this.feedback4 = feedback4;
		this.feedback5 = feedback5;
		
	}
	
	

	public String getDistress() {
		return distress;
	}

	public void setDistress(String distress) {
		this.distress = distress;
	}

	public String getConsult() {
		return consult;
	}

	public void setConsult(String consult) {
		this.consult = consult;
	}

	public String getPersonal() {
		return personal;
	}

	public void setPersonal(String personal) {
		this.personal = personal;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMartial_status() {
		return martial_status;
	}

	public void setMartial_status(String martial_status) {
		this.martial_status = martial_status;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getBest_currently() {
		return best_currently;
	}

	public void setBest_currently(String best_currently) {
		this.best_currently = best_currently;
	}

	public String getMental_health_prof_help() {
		return mental_health_prof_help;
	}

	public void setMental_health_prof_help(String mental_health_prof_help) {
		this.mental_health_prof_help = mental_health_prof_help;
	}

	public String getCurrent_mental_helath_prob() {
		return current_mental_helath_prob;
	}

	public void setCurrent_mental_helath_prob(String current_mental_helath_prob) {
		this.current_mental_helath_prob = current_mental_helath_prob;
	}

	public String getSeek_mental_prof_help() {
		return seek_mental_prof_help;
	}

	public void setSeek_mental_prof_help(String seek_mental_prof_help) {
		this.seek_mental_prof_help = seek_mental_prof_help;
	}

	public String getFeedback1() {
		return feedback1;
	}

	public void setFeedback1(String feedback1) {
		this.feedback1 = feedback1;
	}

	public String getFeedback2() {
		return feedback2;
	}

	public void setFeedback2(String feedback2) {
		this.feedback2 = feedback2;
	}

	public String getFeedback3() {
		return feedback3;
	}

	public void setFeedback3(String feedback3) {
		this.feedback3 = feedback3;
	}

	public String getFeedback4() {
		return feedback4;
	}

	public void setFeedback4(String feedback4) {
		this.feedback4 = feedback4;
	}

	public String getFeedback5() {
		return feedback5;
	}

	public void setFeedback5(String feedback5) {
		this.feedback5 = feedback5;
	}
}
