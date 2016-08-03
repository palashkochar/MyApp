package me.palash.MyApi.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.palash.MyApi.dao.PatientDAO;
import me.palash.MyApi.model.Medications;
import me.palash.MyApi.model.Patient;
import me.palash.MyApi.model.Vitals;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientDAO patientDAO;

	public Collection<Patient> findAll() {
		Collection<Patient> patients = patientDAO.findAll();
		return patients;
	}

	public Patient findOne(int id) {
		Patient patient = patientDAO.findOne(id);
		return patient;
	}

	@Override
	public Collection<Medications> findMeds(int id) {
		Patient patient = patientDAO.findOne(id);
		if (patient == null) {
			return null;
		}
		Collection<Medications> medications = patient.getMedications();
		return medications;
	}

	public Vitals findVitals(int id) {
		Patient patient = patientDAO.findOne(id);
		if (patient == null) {
			return null;
		}
		Vitals vitals = patient.getVitals();
		return vitals;
	}

	public Vitals updateVitals(Vitals vitals, int id) {
		Patient patient = findOne(id);
        if (patient == null) {
            // Cannot update Greeting that hasn't been persisted
            return null;
        }
        patient.setVitals(vitals);
        Patient updatedPatient = patientDAO.save(patient);

        return updatedPatient.getVitals();
	}

}
