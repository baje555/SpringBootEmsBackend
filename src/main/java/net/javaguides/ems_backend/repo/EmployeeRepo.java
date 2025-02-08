package net.javaguides.ems_backend.repo;

import net.javaguides.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long > {




}
