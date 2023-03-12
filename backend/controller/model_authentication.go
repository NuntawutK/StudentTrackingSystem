package controller

// LoginPayload login body
type LoginPayload struct {
	CodeID string `json:"codeid"`
	Password  string `json:"password"`
}

// LoginResponse token response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Name string `json:"name"`
	role  string `json:"role"`
}

// msg: 'login complete',
// userId: user.id,
// access_token: this.jwtService.sign(playload),
