import type { LoaderFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import { createClient } from "@libsql/client/web";

export const meta: V2_MetaFunction = () => {
	return [{ title: "New Remix App" }];
};

export const loader: LoaderFunction = async ({ context }) => {
	console.log("Starting query");
	const test = await createClient({
		url: context.TURSO_DATABASE_URL as string,
		authToken: context.TURSO_AUTH_TOKEN as string,
	}).execute(`select * from users`);
	console.log("results", test);
	return test;
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Welcome to Remix</h1>
			<ul>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/blog"
						rel="noreferrer"
					>
						15m Quickstart Blog Tutorial
					</a>
				</li>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/jokes"
						rel="noreferrer"
					>
						Deep Dive Jokes App Tutorial
					</a>
				</li>
				<li>
					<a target="_blank" href="https://remix.run/docs" rel="noreferrer">
						Remix Docs
					</a>
				</li>
			</ul>
		</div>
	);
}
