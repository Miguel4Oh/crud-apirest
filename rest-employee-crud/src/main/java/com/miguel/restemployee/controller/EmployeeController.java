package com.miguel.restemployee.controller;

import com.miguel.restemployee.entities.Employee;
import com.miguel.restemployee.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public List<Employee> showAll(){
        return employeeService.findAll();
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> showById(@PathVariable Long id){
        try{
            Employee employee = employeeService.findById(id);
            return ResponseEntity.ok(employee);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/employees")
    public void saveEmployee(@RequestBody Employee employee){
        employeeService.save(employee);
    }

    @PutMapping("/employees")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
        try{
            employeeService.save(employee);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id){
        try{
            employeeService.deleteById(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
