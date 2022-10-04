import React from "react";
import adminLayout from "../hoc/adminLayout"
import {axiosInstance} from "../utils/axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TextCard from "../components/TextCard";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Users contacts analyses',
        },
    },
};

class DashboardPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contactCount: 0,
            groupCount: 0,
            emailCount: 0,
            phoneNumberCount: 0,
            labels: ["Contacts count"],
            datasets: [],
            chartData: {labels: [], datasets: []},
            colors: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(66, 238, 127, 0.5)',
                'rgba(31, 39, 127, 0.5)',
                'rgba(211, 59, 127, 0.5)',
                'rgba(233, 248, 127, 0.5)'
            ]
        }
    }

    getRandomColor = () => {
        return this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    }

    fetchChartData = () => {
        axiosInstance.get("/api/v1/contact/users_chart/")
            .then(response => {
                let state = this.state
                let labels = state.labels
                response.data.map(({first_name, last_name, count}) => {
                    state.datasets.push(
                        {
                            label: `${first_name} ${last_name}`,
                            data: state.labels.map(() => count),
                            backgroundColor: this.getRandomColor()
                        }
                    )
                })
                state.chartData = {
                    labels,
                    datasets: state.datasets
                }
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchContactCount = () => {
        axiosInstance.get("/api/v1/contact/contact_count/")
            .then(response => {
                let state = this.state
                state.contactCount = response.data.count
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchGroupCount = () => {
        axiosInstance.get("/api/v1/contact/group_count/")
            .then(response => {
                let state = this.state
                state.groupCount = response.data.count
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchEmailCount = () => {
        axiosInstance.get("/api/v1/contact/email_count/")
            .then(response => {
                let state = this.state
                state.emailCount = response.data.count
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    fetchPhoneNumberCount = () => {
        axiosInstance.get("/api/v1/contact/phone_number_count/")
            .then(response => {
                let state = this.state
                state.phoneNumberCount = response.data.count
                this.setState(state)
            })
            .catch(err => {console.log(err.message)})
    }

    componentDidMount() {
        this.fetchContactCount()
        this.fetchEmailCount()
        this.fetchGroupCount()
        this.fetchPhoneNumberCount()
        this.fetchChartData()
    }

    render(){
        return <>
            <div className="row">
                <TextCard count={this.state.contactCount} parameter={"Contacts"} href={"/contacts"} icon={"fa-photo"} />
                <TextCard count={this.state.groupCount} parameter={"Groups"} href={"/groups"} icon={"fa-list"} />
                <TextCard count={this.state.emailCount} parameter={"Emails"} href={"/contacts"} icon={"fa-mail-reply"} />
                <TextCard count={this.state.phoneNumberCount} parameter={"Phone numbers"} href={"/contacts"} icon={"fa-support"} />
                <Bar options={options} data={this.state.chartData} />;
            </div>
        </>
    }
}

export default adminLayout(DashboardPage);