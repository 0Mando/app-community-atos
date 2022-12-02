export interface User{
	id? : string;
	name?: string;
	birthday: string;
	email: string;
	password: string;
	profilePicture? : string;
	bannerImage?: string;
	userType: 'normal-user' | 'auth-user' | 'moderator' | 'admin' | 'disabled';
	userTypeBackup: 'normal-user' | 'auth-user' | 'moderator' | 'admin';
	website?: string;
	work?: string;
	checked?: boolean;
	skills?: string[];
	comments?: number;
}

/**
 * README
 *
 * Normal User: Cuenta creada pero no verificada, tiene acceso a los tableros, canales y artículos.
 * Auth User: Cuenta verificada, acceso a tableros, canales, artículos y creación de artículos y comentarios.
 * Moderator: Reporta artículos y comentarios.
 * Admin: Crea tableros, canales, revisa reportes.
 */
