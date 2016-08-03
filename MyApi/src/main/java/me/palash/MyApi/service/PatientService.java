package me.palash.MyApi.service;

import java.util.Collection;

import me.palash.MyApi.model.Medications;
import me.palash.MyApi.model.Patient;
import me.palash.MyApi.model.Vitals;

public interface PatientService {

	Collection<Patient> findAll();

	Patient findOne(int id);

	Collection<Medications> findMeds(int id);

	Vitals findVitals(int id);

	Vitals updateVitals(Vitals vitals, int id);
}
