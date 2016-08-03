package me.palash.MyApi.model;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="patient")
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PATIENT_ID", unique = true, nullable = false)
	private int patientId;
	
	@Column(name = "FIRST_NAME")
	private String firstName;
	
	@Column(name = "LAST_NAME")
	private String lastName;
	
	@Column(name = "TOWN")
	private String town;
	
	@Embedded
	private Vitals vitals;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy="patient")
	private Collection<Medications> medications = new ArrayList<Medications>();

	public Patient(){
		
	}
	
	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public Vitals getVitals() {
		return vitals;
	}

	public void setVitals(Vitals vitals) {
		this.vitals = vitals;
	}
	
	@JsonManagedReference
	public Collection<Medications> getMedications() {
		return medications;
	}

	public void setMedications(Collection<Medications> medications) {
		this.medications = medications;
	}

}
