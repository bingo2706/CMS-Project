import React from 'react';
import {
    getAllUsers,
    createNewUser,
    UpdateUserService,
    DeleteUserService,
    handleLoginService,
    SoftDeleteUserService,
    RestoreUserService,
    getDetailUserById,
} from '../../../services/userService';
import { render } from '@testing-library/react';

describe('userService', () => {
    it('Test all method', () => {
        getAllUsers({
            limit: '',
            offset: '',
            keyword: '',
            isDeleted: 0,
        });
    });
    it('createNewUser', () => {
        createNewUser({
            email: 'inputValues.email',
            password: 'inputValues.password',
            firstName: 'inputValues.firstName',
            lastName: 'inputValues.lastName',
            roleId: 'inputValues.roleId',
            genderId: 'inputValues.genderId',
            phonenumber: 'inputValues.phonenumber',
            avatar: 'inputValues.image',
            dob: 'inputValues.date',
        });
    });
    it('UpdateUserService', () => {
        UpdateUserService({
            email: 'inputValues.email',
            password: 'inputValues.password',
            firstName: 'inputValues.firstName',
            lastName: 'inputValues.lastName',
            roleId: 'inputValues.roleId',
            genderId: 'inputValues.genderId',
            phonenumber: 'inputValues.phonenumber',
            avatar: 'inputValues.image',
            dob: 'inputValues.date',
            id: '123',
        });
    });
    it('DeleteUserService', () => {
        DeleteUserService(12);
    });
    it('handleLoginService', () => {
        handleLoginService({
            username: '123',
            password: '123',
        });
    });
    it('handleLoginService', () => {
        handleLoginService({
            username: '123',
            password: '123',
        });
    });
    it('getDetailUserById', () => {
        getDetailUserById(1);
    });
    it('RestoreUserService', () => {
        RestoreUserService({
            test: 'test',
        });
    });
    it('SoftDeleteUserService', () => {
        SoftDeleteUserService({
            test: 'test',
        });
    });
});
