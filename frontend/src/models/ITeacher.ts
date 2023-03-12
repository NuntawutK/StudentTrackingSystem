import { BirthMonthsInterface } from "./IStudent";

export interface TeachersInterface {
    
	ID : number,

	id: number,

	Picture:string;
	
	First_Name: string;

	ID_Card: string;

	Last_Name:string;

	Full_Name: string;

	Email :string;

	Address: string;

	Province: string;

	ZipCode: string;

	PhoneNumber: string;

	CodeID: string;

	BirthDay: number;

	BirthYear:number;

	BirthMonthID:	number;
	BirthMonth:  	BirthMonthsInterface;

	Password: string;
}