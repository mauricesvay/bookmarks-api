const SESSIONS = {
  1: {
    id: "7a3ddfe4-c444-4411-ac19-a1a1f39a806e",
    email: "admin@example.com",
    name: "Admin",
    role: "admin",
  },
  2: {
    id: "860ba439-e8a9-42af-b97f-db8ac7f7bbcb",
    email: "user1@example.com",
    name: "User 1",
  },
  3: {
    id: "c1414e66-aee4-43d3-8842-081ec623313d",
    email: "user2@example.com",
    name: "User 2",
  },
};

function getClientIp(req) {
  return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
}

function getCurrentUser(req) {
  const ssid = req.headers["x-ssid"];
  const session = ssid && SESSIONS[ssid];
  return session;
}

module.exports = {
  getClientIp,
  getCurrentUser,
};
