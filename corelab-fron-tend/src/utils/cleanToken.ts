export default function cleanToken(token: string) {
  return token.replace(/^['"]+|['"]+$/g, '');
}
