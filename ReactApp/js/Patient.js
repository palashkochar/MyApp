var testMode;
var PatientDeatils = React.createClass({
    getInitialState: function(){
        return {
            patientName: this.props.patName,
            patientId: this.props.patId,
            medication:[],
            displayDetail:false,
        }
    },
    componentWillMount: function() {
        this.setState({medication:this.props.result});
    },
    componentDidMount: function(){
        
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({patientName: nextProps.patName});
        this.setState({patientId: nextProps.patId});
        this.setState({medication: nextProps.result});
    },
    render: function(){
        return(
            <div >
                <div className="details col-lg-offset-1">
                    <h3>Patient Details</h3>
                    <h4>Name: {this.state.patientName}</h4>
                    <h4>Id: {this.state.patientId}</h4>
                    <h4>Medications:</h4>
                    <ul>
                        {this.state.medication.map(function(result) {
                            return <li key={result.id} >{result.medname}</li>;
                        })}
                    </ul>
                </div>
                <PatientVitals patientId={this.state.patientId}/>
            </div>
        );
    }
});

var PatientVitals = React.createClass({
    getInitialState: function(){
        return {
            editing: false,
            temperature: 0,
            pulse: 0,
            patientId: this.props.patientId
        }
    },
    componentWillMount: function() {
        this.getVitalsData(this.state.patientId);
        
    },
    componentDidMount: function(){
        document.getElementById("message").style.visibility = "hidden";
    },
    componentWillReceiveProps: function(nextProps) {
        this.getVitalsData(nextProps.patientId);
        this.setState({patientId: nextProps.patientId});
    },
    getVitalsData: function(patientId){
        var self = this;
        var url;
        if(testMode){
            url = "data/patient/vitals/vitals"+patientId+".json";
        }else{
            url = "patients/vitals/"+patientId;
        }
        var vitalsData = {};
        $.get(url, function(data) {
            vitalsData = data;
            self.setState({temperature: vitalsData.temperature});
            self.setState({pulse: vitalsData.pulse});
        });
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        self = this;
        var vitals = {};
        var temperature = this.refs.newTemp.getDOMNode().value;
        var pulse = this.refs.newPulse.getDOMNode().value;
        vitals.temperature = temperature;
        vitals.pulse = pulse;
        var url;
        if(testMode){
            url = "data/patient/vitals/vitals"+this.state.patientId+".json";
        }else{
            url = "patients/vitals/"+this.state.patientId;
        }

        $.post(url, vitals).done(function(data) {
            alert( "Data Loaded: ");
            successmessage = 'Data was succesfully saved';
            vitalsData = data;
            self.setState({editing: false});
            self.setState({temperature: vitalsData.temperature});
            self.setState({pulse: vitalsData.pulse});
            document.getElementById("message").style.visibility = "visible";
        }).fail(function() {
            alert( "error" );
        });
    },
    renderDisplay: function() {
        return (
            <div className="vitalsForm col-lg-offset-1" >
                <h4>Patient Vitals</h4>
                <div className="form-group row">
                  <label for="temperature" className="col-sm-2 col-form-label">Temperature</label>
                  <div className="col-sm-10">
                    <span>{this.state.temperature}</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="pulse" className="col-sm-2 col-form-label">Pulse</label>
                  <div className="col-sm-10">
                    <span>{this.state.pulse}</span>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-10">
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <p id="message">Temperature and Pulse saved successfully!</p>
                  </div>
                </div>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="vitalsForm col-lg-offset-1">
                <h4>Patient Vitals</h4>
                <div className="form-group row">
                  <label for="temperature" className="col-sm-2 col-form-label">Temperature</label>
                  <div className="col-sm-10">
                    <input type="text" ref="newTemp" className="inputField form-control" id="temperature" placeholder="Temperature of Patient" />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="pulse" className="col-sm-2 col-form-label">Pulse</label>
                  <div className="col-sm-10">
                    <input type="text" ref="newPulse" className="inputField form-control" id="pulse" placeholder="Pulse of Patient" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-10">
                    <button type="submit" onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
                  </div>
                </div>
            </div>
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

var Patient = React.createClass({
    getInitialState: function() {
        return {
            patients: [],
            patientCicked: false,
            test: true
        };
    },
    componentWillMount: function() {
        var self = this;
        var arr = [];
        $.get("data/patient/patientsData.json", function(data) {
            arr = data;
            self.setState({patients: arr});
        });        
    },
    componentDidMount: function(){
        
    },
    handleClick: function(result){
        var url;
        var medArr = [];
        if(testMode){
            url = "data/patient/med/med"+result.patientId+".json";
        }else{
            url = "patients/med/"+result.patientId;
        }

        $.get(url, function(data) {
            medArr = data;
            var name = result.firstName+" "+result.lastName;
            React.render(<PatientDeatils patName={name} patId={result.patientId} result={medArr}/>, document.getElementById('detailsContainer'));
        });
        
    },
    checkTestMode: function(){
        
            this.setState({test: !this.state.test});
            testMode=this.state.test;
        
    },
    render: function() {
        return (
            <div className="pat">
                <input type="checkbox" id="mode" onChange={this.checkTestMode}/><label for="mode"> Run using dummy data</label>
                <h3>Patients List</h3>
                <div className="list-group">
                    {this.state.patients.map(function(result) {
                        var name = result.firstName+" "+result.lastName;
                        return <a key={result.id} className="list-group-item list-group-item-info" onClick={this.handleClick.bind(this, result)}>{name}</a>
                    }, this)}
                </div>
                
            </div>
        );
    }
});

React.render(<Patient />, document.getElementById('container'));