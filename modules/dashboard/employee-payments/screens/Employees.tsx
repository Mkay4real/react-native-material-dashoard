import React, {useMemo} from 'react';
import {employees} from '../../../../shared/utils/dummy_data';
import EmployeeList from '../../components/EmployeeList';

export default function Employees() {
  return <EmployeeList data={employees} showSalary={true} />;
}
