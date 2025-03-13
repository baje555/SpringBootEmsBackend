package net.javaguides.ems_backend.services.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.EmployeeDto;
import net.javaguides.ems_backend.entity.Employee;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.EmployeeMapper;
import net.javaguides.ems_backend.repo.EmployeeRepo;
import net.javaguides.ems_backend.services.EmployeeService;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepo employeeRepo;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Employee saveEmployee = employeeRepo.save(employee);

        return EmployeeMapper.mapToEmployeeDto(saveEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id:" + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

       Employee employee = employeeRepo.findById(employeeId).orElseThrow((

        ) -> new ResourceNotFoundException("Employee does not exists of id: " + employeeId));

        employee.setName(updatedEmployee.getName());

        employee.setEmail(updatedEmployee.getEmail());
        employee.setPosition(updatedEmployee.getPosition());
        Employee updatedEmployeeObj = employeeRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);


    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepo.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exists of id: " + employeeId));
employeeRepo.deleteById(employeeId);

    }
}
