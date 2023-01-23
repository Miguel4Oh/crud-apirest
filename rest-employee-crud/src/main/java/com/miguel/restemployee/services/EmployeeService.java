package com.miguel.restemployee.services;

import com.miguel.restemployee.entities.Employee;

import java.util.List;

public interface EmployeeService {
    public List<Employee> findAll();
    public Employee findById(Long id);
    public void save(Employee employee);
    public void deleteById(Long id);
}
