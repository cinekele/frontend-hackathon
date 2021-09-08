export interface Employee {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    description: string;
    supervisor: Employee;
    subordiantes: Employee[];
    url: string;
}