package org.project.IIITB.AppWellness.model;

import java.util.Date;
import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.annotation.XmlRootElement;

import java.util.ArrayList;

@XmlRootElement
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class Section {

	protected String section_id;
	protected int user_id;
	protected int section_count;
	protected String section_count1;
	protected String time;
	protected String response;
	protected String name;
	protected String totalsum;
	protected String feedback;
	protected String percentile;
	protected String percentilevalue;
	

	
	
	public Section(int user_id,String name, String section_id,int section_count, String time, String response,String totalsum,String percentile) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.section_count = section_count;
		this.section_id = section_id;
		this.time = time;
		this.response = response;
		this.totalsum=totalsum;
		this.percentile=percentile;

	}
	public Section(int user_id,String section_id,String totalsum,int section_count) {
		super();
		this.user_id = user_id;	
		this.section_id = section_id;
		this.totalsum = totalsum;
		this.section_count = section_count;
		

	}
	public Section(int user_id,String name,String section_id, String time,String totalsum,int section_count) {
		super();
		this.user_id = user_id;	
		this.name = name;
		this.section_id = section_id;
		this.time = time;
		this.totalsum = totalsum;
		this.section_count = section_count;
		

	}
	
	public Section(int user_id,String name, String time,String totalsum,int section_count) {
		super();
		this.user_id = user_id;	
		this.name = name;
		//this.section_id = section_id;
		this.time = time;
		this.totalsum = totalsum;
		this.section_count = section_count;
		

	}
	
	
	/*public Section(String totalsum) {
		super();
		this.totalsum = totalsum;	
		
	}*/
	
	public Section(int user_id,String name, String section_id,int section_count,String totalsum) {
		super();
		this.user_id = user_id;
		this.name = name;
		this.section_count = section_count;
		this.section_id = section_id;
		this.totalsum=totalsum;
		

	}

	public Section(String time, String totalsum, String feedback, String percentile, String percentilevalue) {

		super();
		this.time = time;
		this.totalsum = totalsum;
		this.feedback = feedback;
		this.percentile = percentile;
		this.percentilevalue = percentilevalue;
	}

public Section(int user_id,String totalsum,String section_id) {
		
		super();
		this.user_id = user_id;
		this.totalsum = totalsum;
		this.section_id = section_id;
		
		System.out.println("coming to model uid "+user_id+"  totalscore   "+totalsum);
	}
	
	public String getTotalsum() {
		return totalsum;
	}

	public void setTotalsum(String totalsum) {
		this.totalsum = totalsum;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getPercentile() {
		return percentile;
	}

	public void setPercentile(String percentile) {
		this.percentile = percentile;
	}

	public String getPercentilevalue() {
		return percentilevalue;
	}

	public void setPercentilevalue(String percentilevalue) {
		this.percentilevalue = percentilevalue;
	}

	public String getSection_id() {
		return section_id;
	}

	public void setSection_id(String section_id) {
		this.section_id = section_id;
	}
	public int getSection_count() {
		return section_count;
	}

	public void setSection_count(int section_count) {
		this.section_count = section_count;
	}
	
	public String getSection_count1() {
		return section_count1;
	}

	public void setSection_count1(String section_count1) {
		this.section_count1 = section_count1;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
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
	


}
