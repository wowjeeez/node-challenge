export default function security(req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
}
