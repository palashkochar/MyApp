package me.palash.MyApi.dao;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//import me.palash.MyApi.model.Medications;
import me.palash.MyApi.model.Patient;
//import me.palash.MyApi.model.Vitals;

@Repository
public interface PatientDAO extends JpaRepository<Patient, Integer> {

	// Collection<Patient> findAll();
	//
	// Patient findOne(int id);
	//
	// Medications findMeds(int id);
	//
	// Vitals findVitals(int id);
	//
	// Vitals updateVitals(Vitals vitals);

}
