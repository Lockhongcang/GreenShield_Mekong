// Lightweight chat API client for Chatbox Greenshield Mekong
// Endpoints (Spring Boot):
// - GET    /api/v1/chat/topics           -> Map<String, String>
// - POST   /api/v1/chat/select-topic     -> text (ack string)
// - POST   /api/v1/chat/message          -> text (AI reply)

// Resolve API base URL:
// - Prefer VITE_API_BASE if provided (e.g., https://green-shield-mekong.azurewebsites.net)
// - Fallback to the production Azure site with https scheme
const DEFAULT_BASE = 'https://green-shield-mekong.azurewebsites.net';

function normalizeBase(input) {
	let b = (input || '').trim();
	if (!b) return DEFAULT_BASE;
	// If protocol missing, assume https
	if (!/^https?:\/\//i.test(b)) {
		b = `https://${b}`;
	}
	// Remove any trailing slash
	return b.replace(/\/+$/, '');
}

const base = normalizeBase(import.meta.env?.VITE_API_BASE || DEFAULT_BASE);

async function http(url, options = {}) {
	const method = (options.method || 'GET').toUpperCase();
	// Only set JSON content-type for write requests; avoid adding it to GET to keep it a simple request (no preflight)
	const defaultHeaders = (method === 'POST' || method === 'PUT' || method === 'PATCH')
		? { 'Content-Type': 'application/json' }
		: {};

	const res = await fetch(url, {
		// Backend relies on HttpSession cookies — include credentials
		credentials: 'include',
		headers: {
			...defaultHeaders,
			...(options.headers || {}),
		},
		...options,
	});

	// Try JSON first, fall back to text
	const contentType = res.headers.get('content-type') || '';
	const body = contentType.includes('application/json') ? await res.json() : await res.text();
	if (!res.ok) {
		const msg = typeof body === 'string' ? body : JSON.stringify(body);
		throw new Error(msg || `Request failed: ${res.status}`);
	}
	return body;
}

export async function getTopics() {
	return http(`${base}/api/v1/chat/topics`, { method: 'GET' });
}

export async function selectTopic(topicKey) {
	if (!topicKey) throw new Error('topic is required');
	return http(`${base}/api/v1/chat/select-topic`, {
		method: 'POST',
		body: JSON.stringify({ topic: String(topicKey) }),
	});
}

export async function sendMessage(message) {
	if (!message || !message.trim()) throw new Error('message is required');
	return http(`${base}/api/v1/chat/message`, {
		method: 'POST',
		body: JSON.stringify({ message }),
	});
}

export const CHAT_API_BASE = base;

