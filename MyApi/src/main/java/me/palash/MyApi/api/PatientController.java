package me.palash.MyApi.api;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.palash.MyApi.model.Medications;
import me.palash.MyApi.model.Patient;
import me.palash.MyApi.model.Vitals;
import me.palash.MyApi.service.PatientService;

@RestController
public class PatientController {

	@Autowired
	private PatientService patientService;

	@RequestMapping(value = "/patients", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Patient>> getPatients() {
		Collection<Patient> patients = patientService.findAll();
		return new ResponseEntity<Collection<Patient>>(patients, HttpStatus.OK);
	}

	@RequestMapping(value = "/patients/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Patient> getPatient(@PathVariable("id") int id) {
		Patient patient = patientService.findOne(id);
		if (patient == null) {
			return new ResponseEntity<Patient>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Patient>(patient, HttpStatus.OK);
	}

	@RequestMapping(value = "/patients/med/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Medications>> getMedication(@PathVariable("id") int id) {
		Collection<Medications> medications = patientService.findMeds(id);
		if (medications == null) {
			return new ResponseEntity<Collection<Medications>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Collection<Medications>>(medications, HttpStatus.OK);
	}

	@RequestMapping(value = "/patients/vitals/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Vitals> getVitals(@PathVariable("id") int id) {
		Vitals vitals = patientService.findVitals(id);
		if (vitals == null) {
			return new ResponseEntity<Vitals>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Vitals>(vitals, HttpStatus.OK);
	}

	@RequestMapping(value = "/patients/vitals/{id}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Vitals> updateVitals(@RequestBody Vitals vitals, @PathVariable("id") int id) {
		System.out.println(vitals);
		Vitals updatedVitals = patientService.updateVitals(vitals, id);
		System.out.println("after update"+vitals);
		if (updatedVitals == null) {
			return new ResponseEntity<Vitals>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<Vitals>(updatedVitals, HttpStatus.OK);
	}
}
