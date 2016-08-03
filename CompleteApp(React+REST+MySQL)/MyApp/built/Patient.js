var testMode;
var PatientDeatils = React.createClass({
    displayName: "PatientDeatils",

    getInitialState: function () {
        return {
            patientName: this.props.patName,
            patientId: this.props.patId,
            medication: [],
            displayDetail: false
        };
    },
    componentWillMount: function () {
        this.setState({ medication: this.props.result });
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
        this.setState({ patientName: nextProps.patName });
        this.setState({ patientId: nextProps.patId });
        this.setState({ medication: nextProps.result });
    },
    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "details col-lg-offset-1" },
                React.createElement(
                    "h3",
                    null,
                    "Patient Details"
                ),
                React.createElement(
                    "h4",
                    null,
                    "Name: ",
                    this.state.patientName
                ),
                React.createElement(
                    "h4",
                    null,
                    "Id: ",
                    this.state.patientId
                ),
                React.createElement(
                    "h4",
                    null,
                    "Medications:"
                ),
                React.createElement(
                    "ul",
                    null,
                    this.state.medication.map(function (result) {
                        return React.createElement(
                            "li",
                            { key: result.id },
                            result.medname
                        );
                    })
                )
            ),
            React.createElement(PatientVitals, { patientId: this.state.patientId })
        );
    }
});

var PatientVitals = React.createClass({
    displayName: "PatientVitals",

    getInitialState: function () {
        return {
            editing: false,
            temperature: 0,
            pulse: 0,
            patientId: this.props.patientId
        };
    },
    componentWillMount: function () {
        this.getVitalsData(this.state.patientId);
    },
    componentDidMount: function () {
        document.getElementById("message").textContent = "";
    },
    componentWillReceiveProps: function (nextProps) {
        this.getVitalsData(nextProps.patientId);
        this.setState({ patientId: nextProps.patientId });
        this.setState({ editing: false });
    },
    getVitalsData: function (patientId) {
        var self = this;
        var url;
        if (testMode) {
            url = "data/patient/vitals/vitals" + patientId + ".json";
        } else {
            url = "patients/vitals/" + patientId;
        }
        var vitalsData = {};
        $.get(url, function (data) {
            vitalsData = data;
            self.setState({ temperature: vitalsData.temperature });
            self.setState({ pulse: vitalsData.pulse });
            document.getElementById("message").textContent = "";
        });
    },
    edit: function () {
        this.setState({ editing: true });
    },
    save: function () {
        self = this;
        var vitals = {};
        var temperature = this.refs.newTemp.getDOMNode().value;
        var pulse = this.refs.newPulse.getDOMNode().value;
        vitals.temperature = temperature;
        vitals.pulse = pulse;
        var url;
        if (testMode) {
            //url = "data/patient/vitals/vitals"+this.state.patientId+".json";
            self.setState({ editing: false });
            self.setState({ temperature: temperature });
            self.setState({ pulse: pulse });
            document.getElementById("message").textContent = "Temperature and Pulse saved successfully temprorily!";
        } else {
            url = "patients/vitals/" + this.state.patientId;
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                data: JSON.stringify(vitals),
                contentType: "application/json",
                success: function (data) {
                    successmessage = 'Data was succesfully saved';
                    vitalsData = data;
                    self.setState({ editing: false });
                    self.setState({ temperature: vitalsData.temperature });
                    self.setState({ pulse: vitalsData.pulse });
                    document.getElementById("message").textContent = "Temperature and Pulse saved successfully!";
                },
                error: function (data) {
                    alert('Error');
                }
            });
        }
    },
    renderDisplay: function () {
        return React.createElement(
            "div",
            { className: "vitalsForm col-lg-offset-1" },
            React.createElement(
                "h4",
                null,
                "Patient Vitals"
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "label",
                    { "for": "temperature", className: "col-sm-2 col-form-label" },
                    "Temperature"
                ),
                React.createElement(
                    "div",
                    { className: "col-sm-10" },
                    React.createElement(
                        "span",
                        null,
                        this.state.temperature
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "label",
                    { "for": "pulse", className: "col-sm-2 col-form-label" },
                    "Pulse"
                ),
                React.createElement(
                    "div",
                    { className: "col-sm-10" },
                    React.createElement(
                        "span",
                        null,
                        this.state.pulse
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "div",
                    { className: "offset-sm-2 col-sm-10" },
                    React.createElement("button", { onClick: this.edit, className: "btn btn-primary glyphicon glyphicon-pencil" })
                )
            ),
            React.createElement("p", { id: "message" })
        );
    },
    renderForm: function () {
        return React.createElement(
            "div",
            { className: "vitalsForm col-lg-offset-1" },
            React.createElement(
                "h4",
                null,
                "Patient Vitals"
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "label",
                    { "for": "temperature", className: "col-sm-2 col-form-label" },
                    "Temperature"
                ),
                React.createElement(
                    "div",
                    { className: "col-sm-10" },
                    React.createElement("input", { type: "text", ref: "newTemp", className: "inputField form-control", id: "temperature", placeholder: "Temperature of Patient" })
                )
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "label",
                    { "for": "pulse", className: "col-sm-2 col-form-label" },
                    "Pulse"
                ),
                React.createElement(
                    "div",
                    { className: "col-sm-10" },
                    React.createElement("input", { type: "text", ref: "newPulse", className: "inputField form-control", id: "pulse", placeholder: "Pulse of Patient" })
                )
            ),
            React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                    "div",
                    { className: "offset-sm-2 col-sm-10" },
                    React.createElement("button", { onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk" })
                )
            )
        );
    },
    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }
});

var Patient = React.createClass({
    displayName: "Patient",

    getInitialState: function () {
        return {
            patients: [],
            patientCicked: false,
            test: true
        };
    },
    componentWillMount: function () {
        var self = this;
        var arr = [];
        $.get("data/patient/patientsData.json", function (data) {
            arr = data;
            self.setState({ patients: arr });
        });
    },
    componentDidMount: function () {},
    handleClick: function (result) {
        var url;
        var medArr = [];
        if (testMode) {
            url = "data/patient/med/med" + result.patientId + ".json";
        } else {
            url = "patients/med/" + result.patientId;
        }

        $.get(url, function (data) {
            medArr = data;
            var name = result.firstName + " " + result.lastName;
            React.render(React.createElement(PatientDeatils, { patName: name, patId: result.patientId, result: medArr }), document.getElementById('detailsContainer'));
        });
    },
    checkTestMode: function () {

        this.setState({ test: !this.state.test });
        testMode = this.state.test;
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "pat" },
            React.createElement("input", { type: "checkbox", id: "mode", onChange: this.checkTestMode }),
            React.createElement(
                "label",
                { "for": "mode" },
                " Run using dummy data"
            ),
            React.createElement(
                "h3",
                null,
                "Patients List"
            ),
            React.createElement(
                "div",
                { className: "list-group" },
                this.state.patients.map(function (result) {
                    var name = result.firstName + " " + result.lastName;
                    return React.createElement(
                        "a",
                        { key: result.id, className: "list-group-item list-group-item-info", onClick: this.handleClick.bind(this, result) },
                        name
                    );
                }, this)
            )
        );
    }
});

React.render(React.createElement(Patient, null), document.getElementById('container'));