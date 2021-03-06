import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Confirmation from './Confirmation';
import UploadFile from './UploadFile';
import {AuthUserContext} from '../Session/'
import Choose_Provider from './Choose_Provider';
import UserSpecify from '../Providers/UserSpecify';




class  UploadRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
            file:null,
            error:null
        }
        this.onChangeFile.bind(this);
    }


    onChangeFile(files){
        console.log('called')
       this.setState({
           file:files[0],
           error:false
       });
       this.props.history.push('/Upload/Confirm');
       
    }

     Uploader(){
        return (
        <UploadFile file={this.state.file} error={this.state.error} onChangeFile={this.onChangeFile.bind(this)}/>

        );
    }

    Confirm(){
        return (
            <AuthUserContext.Consumer>
                {auth_user => <Confirmation  authUser={auth_user} file={this.state.file}/>}
            </AuthUserContext.Consumer>
        );
    }
    Choose(){
        return(
            <Choose_Provider file={this.state.file}/>
        );
    }
    

    render(){ 
    return (
        <Switch>
            <Route exact path='/Upload' component={this.Uploader.bind(this)}/>
             <Route exact path='/Upload/Confirm' component={this.Confirm.bind(this)}/>
             <Route exact path='/Upload/Choose/' component={this.Choose.bind(this)}/>
             <Route path='/Upload/Choose/:uid' component={UserSpecify}/>
        </Switch>


    );


    }
}


    

export default UploadRouter;