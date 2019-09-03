import React from 'react';
import { connect } from 'react-redux';

// TODO: Define Prop Types
const Alert = (props: any) =>
    props.alerts !== null &&
    props.alerts.length > 0 &&
    props.alerts.map((alerts: any) => (
        <div key={alerts.id} className={`alert alert-${alerts.alertType}`} role="alert">
            {alerts.message}
        </div>
    ));

const mapStateToProps = (state: any) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alert);
