export function DeepDiff(a: any, b: any): any {
	if (a === b) return;

	if (typeof a !== "object" || typeof b !== "object" || !a || !b) return b;

	const out: any = {};

	for (const k in b) {
		const d = DeepDiff(a[k], b[k]);
		if (d !== undefined) out[k] = d;
	}

	return Object.keys(out).length ? out : undefined;
}
