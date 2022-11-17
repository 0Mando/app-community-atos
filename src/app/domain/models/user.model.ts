export interface User{
	id? : string;
	firstName: string;
	lastName: string;
	birthday: string;
	email: string;
	password: string;
	userType: 'normal-user' | 'auth-user' | 'moderator' | 'admin' | 'disabled';
	userTypeBackup: 'normal-user' | 'auth-user' | 'moderator' | 'admin';
	checked?: boolean;
}

/**
 * README
 *
 * Normal User: Cuenta creada pero no verificada, tiene acceso a los tableros, canales y artículos.
 * Auth User: Cuenta verificada, acceso a tableros, canales, artículos y creación de artículos y comentarios.
 * Moderator: Reporta artículos y comentarios.
 * Admin: Crea tableros, canales, revisa reportes.
 */
