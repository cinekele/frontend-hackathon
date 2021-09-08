export interface Employee {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    description: string;
    supervisor: Employee;
    subordinates: Employee[];
    url: string;
}