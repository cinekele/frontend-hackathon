export interface Employee {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    description: string;
    supervisorId: number;
    subordinates: Employee[];
    url: string;
}