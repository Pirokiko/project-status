import uuid from 'uuid/v4';
import {get, post, put} from './http-request-helpers'

const buildEvent = (evt, data) => {
    if(!data){
        return new CustomEvent(evt);
    }

    return new CustomEvent(evt, { detail: data });
};

const dispatch = (evt, evtData) => {
    return data => {
        //Use setTimeout to prevent blocking the main thread to long
        setTimeout(function(){
            document.dispatchEvent(buildEvent(evt, evtData));
        });
        //Return original data to keep the promise working normally
        return data;
    }
};

/***************
 *   Project   *
 ***************/

export const getProjects = () => {
    return get('/projects');
}

export const uploadProject = project => {
    if(!project.id){
        project.id = uuid();
        return post('/projects/', project)
            .then(dispatch('project.changed'));
    }

    return put('/projects/'+project.id, project)
        .then(dispatch('project.changed'));
};

/**************
 *   Client   *
 **************/

export const getClients = () => {
    return get('/clients');
}

export const uploadClient = client => {
    if(!client.id){
        client.id = uuid();
        return post('/clients/', client)
            .then(dispatch('client.changed'));
    }

    return put('/clients/'+client.id, client)
        .then(dispatch('client.changed'));
};


/**************
 *   Sprint   *
 **************/

export const getSprints = () => {
    return get('/sprints');
}

export const uploadSprint = sprint => {
    if(!sprint.id){
        sprint.id = uuid();
        return post('/sprints/', sprint)
            .then(dispatch('sprint.changed'));
    }

    return put('/sprints/'+sprint.id, sprint)
        .then(dispatch('sprint.changed'));
};


/***********
 *  Tasks  *
 ***********/

export const getTasks = () => {
    return get('/tasks');
};

export const uploadTask = task => {
    if(!task.id){
        task.id = uuid();
        return post('/tasks/', task)
            .then(dispatch('task.changed'));
    }

    return put('/tasks/'+task.id, task)
        .then(dispatch('task.changed'));
};