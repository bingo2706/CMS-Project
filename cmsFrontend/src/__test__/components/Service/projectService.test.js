import React from 'react';
import {
    createNewProject,
    getAllProjects,
    SoftDeleteProjectService,
    RestoreProjectService,
    DeleteProjectService,
    getDetailProjectById,
    UpdateProjectService,
    getCountStatusProject,
} from '../../../services/projectService';
import { render } from '@testing-library/react';

describe('projectService', () => {
    it('getAllProjects', () => {
        getAllProjects({
            limit: '',
            offset: '',
            keyword: '',
            isDeleted: 0,
        });
    });
    it('createNewUser', () => {
        createNewProject({
            test: 'test',
        });
    });
    it('SoftDeleteProjectService', () => {
        SoftDeleteProjectService({
            test: 'test',
        });
    });
    it('RestoreProjectService', () => {
        RestoreProjectService({
            test: 'test',
        });
    });
    it('DeleteProjectService', () => {
        DeleteProjectService(1);
    });
    it('getDetailProjectById', () => {
        getDetailProjectById(1);
    });
    it('UpdateProjectService', () => {
        UpdateProjectService({
            test: 'test',
        });
    });
    it('getCountStatusProject', () => {
        getCountStatusProject();
    });
});
