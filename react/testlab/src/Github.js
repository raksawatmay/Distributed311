import React, {Component} from 'react'
// import axios from 'axios'
class Github extends Component {

    // state = { user: 'Benz60711', data:''}
 
    // componentDidMount = () => this.fetchUser(this.state.user)
 
    // fetchUser = (USER) => {
    //     axios.get(`https://api.github.com/users/${USER}`)
    //         .then(response => {
    //             this.setState({data: response.data})
    //             console.log(response.data)
    //         })
    // }
    // handleChange = (e) => {
    //     this.setState({ [e.target.name] : e.target.value });
    // }
 
    render() {
        // const {data} = this.state
        if (this.props.data)
            return ( <div className="cover">
            <div className="data">{this.props.data.id} : {this.props.data.name}</div> 
                <span className="pic">
                    <img src={this.props.data.avatar_url} alt="avatar" width="100px"/>
                </span> 
            </div> 
            )
        return (<div>.</div>);
    }
 }
 
 export default Github