// Resposta de sucesso padronizada
const success = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });

// Resposta de erro padronizada
const error = (res, message, status = 400) =>
  res.status(status).json({ success: false, message });

module.exports = { success, error };
