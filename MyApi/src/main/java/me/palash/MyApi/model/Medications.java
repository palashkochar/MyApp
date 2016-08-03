package me.palash.MyApi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="medications")
public class Medications {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MED_ID", unique = true, nullable = false)
	private int id;
	
	@Column(name = "MED_NAME")
	private String medname;
	
	@Column(name = "MED_DOSE")
	private String dose;
	
	@Column(name = "START_DATE")
	private String startDate;
	
	@Column(name = "STOP_DATE")
	private String stopDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="PATIENT_ID")
	private Patient patient;
	
	public Medications() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMedname() {
		return medname;
	}

	public void setMedname(String medname) {
		this.medname = medname;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getStopDate() {
		return stopDate;
	}

	public void setStopDate(String stopDate) {
		this.stopDate = stopDate;
	}

	@JsonBackReference
	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
}
