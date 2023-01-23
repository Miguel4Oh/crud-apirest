package com.miguel.restemployee.repository;

import com.miguel.restemployee.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

