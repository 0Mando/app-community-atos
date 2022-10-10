export interface User{
	id? : number;
	firstName: string;
	lastName: string;
	birthday: string;
	email: string;
	password: string;
	userType: 'normal-user' | 'auth-user' | 'moderator' | 'admin';
}

/**
 * README
 *
 * Normal User: Cuenta creada pero no verificada, tiene acceso a los tableros, canales y artículos.
 * Auth User: Cuenta verificada, acceso a tableros, canales, artículos y creación de artículos y comentarios.
 * Moderator: Reporta artículos y comentarios.
 * Admin: Crea tableros, canales, revisa reportes.
 */
