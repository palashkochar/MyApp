package me.palash.MyApi.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Vitals {
	
	@Column(name="TEMPERATURE")
	private float temperature;
	
	@Column(name="PULSE")
	private int pulse;
	
	public Vitals(){
		
	}

	public float getTemperature() {
		return temperature;
	}

	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}

	public int getPulse() {
		return pulse;
	}

	public void setPulse(int pulse) {
		this.pulse = pulse;
	}
}
