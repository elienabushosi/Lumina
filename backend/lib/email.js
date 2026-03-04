/**
 * Email service via Resend.
 * Uses RESEND_API_KEY from env – .env.development for dev, .env.production for prod.
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail =
	process.env.RESEND_FROM_EMAIL || "Company Name <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Send a simple test email.
 * @param {string} to - Recipient email address
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function sendTestEmail(to) {
	if (!resend) {
		return {
			success: false,
			error: "Resend not configured (missing RESEND_API_KEY)",
		};
	}
	const { data, error } = await resend.emails.send({
		from: fromEmail,
		to: [to],
		subject: "Test Email",
		html: "<p>This is a test email from your backend. Resend is working.</p>",
	});
	if (error) return { success: false, error: error.message };
	return { success: true, id: data?.id };
}

/**
 * Send password reset email with link and code.
 * @param {string} to - User email
 * @param {string} resetLink - Full URL e.g. FRONTEND_URL/login?resetCode=123456
 * @param {string} code - 6-digit code (for display in body)
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function sendPasswordResetEmail(to, resetLink, code) {
	if (!resend) {
		return {
			success: false,
			error: "Resend not configured (missing RESEND_API_KEY)",
		};
	}
	const html = `
		<p>You requested to reset your password.</p>
		<p>Your code: <strong>${code}</strong></p>
		<p><a href="${resetLink}">Reset password</a></p>
		<p>If you didn't request this, you can ignore this email.</p>
	`;
	const { data, error } = await resend.emails.send({
		from: fromEmail,
		to: [to],
		subject: "Reset your password",
		html,
	});
	if (error) return { success: false, error: error.message };
	return { success: true, id: data?.id };
}

/**
 * Send admin a "new signup" notification. Only sends when NODE_ENV === 'production'.
 * @param {string} userEmail - New user's email
 * @param {string} userName - New user's name
 * @param {string} orgName - Organization name they signed up with
 * @param {string} [signupAt] - ISO timestamp of signup (e.g. user.CreatedAt)
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function sendAdminNewSignupNotification(
	userEmail,
	userName,
	orgName,
	signupAt
) {
	if (process.env.NODE_ENV !== "production") {
		return { success: true };
	}
	const adminEmail = process.env.ADMIN_EMAIL;
	if (!adminEmail || !resend) {
		return { success: true };
	}
	const signupEst = signupAt
		? new Date(signupAt).toLocaleString("en-US", {
				timeZone: "America/New_York",
			}) + " EST"
		: "—";
	const html = `
		<p>A new user signed up.</p>
		<ul>
			<li><strong>Email:</strong> ${userEmail}</li>
			<li><strong>Name:</strong> ${userName}</li>
			<li><strong>Organization:</strong> ${orgName}</li>
			<li><strong>Signed up:</strong> ${signupEst}</li>
		</ul>
	`;
	const { data, error } = await resend.emails.send({
		from: fromEmail,
		to: [adminEmail],
		subject: "New signup",
		html,
	});
	if (error) return { success: false, error: error.message };
	return { success: true, id: data?.id };
}

/**
 * Send admin notification when a user attempts an action (e.g. generate report).
 * Only sends when NODE_ENV === 'production'.
 * @param {string} attemptedAtEst - Date/time of attempt in EST (formatted string)
 * @param {string} userName - User who started the action
 * @param {string} orgName - Organization name
 * @param {string} context - Context/details (e.g. address, resource ID)
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function sendAdminReportAttemptedNotification(
	attemptedAtEst,
	userName,
	orgName,
	context
) {
	if (process.env.NODE_ENV !== "production") {
		return { success: true };
	}
	const adminEmail = process.env.ADMIN_EMAIL;
	if (!adminEmail || !resend) {
		return { success: true };
	}
	const safeName = userName && String(userName).trim() ? userName : "—";
	const html = `
		<p>A user action was attempted.</p>
		<ul>
			<li><strong>Date/Time (EST):</strong> ${attemptedAtEst}</li>
			<li><strong>User name:</strong> ${safeName}</li>
			<li><strong>Organization:</strong> ${orgName}</li>
			<li><strong>Context:</strong> ${context}</li>
		</ul>
	`;
	const { data, error } = await resend.emails.send({
		from: fromEmail,
		to: [adminEmail],
		subject: `User action attempted – ${safeName}`,
		html,
	});
	if (error) return { success: false, error: error.message };
	return { success: true, id: data?.id };
}

/**
 * Send admin notification when an action completes (e.g. report created).
 * Only sends when NODE_ENV === 'production'.
 * @param {string} createdAtEst - Date/time of completion in EST (formatted string)
 * @param {string} userName - User who completed the action
 * @param {string} orgName - Organization name
 * @param {string} context - Context (e.g. address, resource ID)
 * @param {string|null} detail1 - Optional detail (e.g. region/category)
 * @param {string|null} detail2 - Optional detail
 * @param {string|null} detail3 - Optional detail
 * @param {string} status - "ready" or "failed" (or your status values)
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function sendAdminReportCreatedNotification(
	createdAtEst,
	userName,
	orgName,
	context,
	detail1,
	detail2,
	detail3,
	status
) {
	if (process.env.NODE_ENV !== "production") {
		return { success: true };
	}
	const adminEmail = process.env.ADMIN_EMAIL;
	if (!adminEmail || !resend) {
		return { success: true };
	}
	const d1 = detail1 != null && String(detail1).trim() ? detail1 : "—";
	const d2 = detail2 != null && String(detail2).trim() ? detail2 : "—";
	const d3 = detail3 != null && String(detail3).trim() ? detail3 : "—";
	const safeName = userName && String(userName).trim() ? userName : "—";
	const html = `
		<p>An action was completed.</p>
		<ul>
			<li><strong>Date/Time (EST):</strong> ${createdAtEst}</li>
			<li><strong>User name:</strong> ${safeName}</li>
			<li><strong>Organization:</strong> ${orgName}</li>
			<li><strong>Context:</strong> ${context}</li>
			<li><strong>Detail 1:</strong> ${d1}</li>
			<li><strong>Detail 2:</strong> ${d2}</li>
			<li><strong>Detail 3:</strong> ${d3}</li>
			<li><strong>Status:</strong> ${status}</li>
		</ul>
	`;
	const { data, error } = await resend.emails.send({
		from: fromEmail,
		to: [adminEmail],
		subject: `Action completed – ${safeName}`,
		html,
	});
	if (error) return { success: false, error: error.message };
	return { success: true, id: data?.id };
}

export { resend };
