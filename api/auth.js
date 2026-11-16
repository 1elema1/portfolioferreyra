export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    const password = body?.password;

    if (!password) {
      return res.status(400).json({ success: false, error: 'Se requiere contraseña' });
    }

    // Variables de entorno de Vercel
    const envPasswords = [
      process.env.ADMIN_PASSWORD,
      process.env.PORTFOLIOVERCEL,
      process.env['SESSION.SECRET'],
      process.env.SESSION_SECRET,
      process.env.VITE_ADMIN_PASSWORD
    ].filter(Boolean);

    // Si existen variables en Vercel, validar contra ellas
    if (envPasswords.length > 0) {
      const match = envPasswords.some(validPwd => validPwd === password);
      if (match) {
        return res.status(200).json({ success: true, message: 'Autenticado correctamente con variable de entorno' });
      }
      return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
    }

    // Clave de respaldo si no hay variables de entorno configuradas
    if (password === 'emanuel2026') {
      return res.status(200).json({ success: true, message: 'Autenticado correctamente' });
    }

    return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error del servidor de autenticación' });
  }
}
