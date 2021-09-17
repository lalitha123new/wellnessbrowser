package org.project.IIITB.AppWellness.model;

import java.util.List;

public class Score {
	
	private int sID;
	List<Integer>answers;
	public Score(int sID,List<Integer>ans)
	{
		this.sID=sID;
		this.answers=ans;
	}
	public int calcScore()
	{
		return 5;
	}
}
