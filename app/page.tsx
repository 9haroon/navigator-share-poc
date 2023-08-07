"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, useCallback, useRef } from "react";

async function webShare(text: string, file?: File | null) {
	try {
		if (navigator) {
			console.log("text", text);
			await navigator.share({
				title: text,
				text: text,
				...(file && { files: [file] }),
			});
		}
	} catch (error) {
		console.log(error);
		alert("Your device cannot share this");
	}
}

export default function Home() {
	const formRef = useRef<HTMLFormElement>(null);
	const handleSubmit = useCallback(
		(ev: FormEvent) => {
			ev.preventDefault();
			const form = formRef.current;
			const shareTextElem = form?.querySelector(
				'[name="shareText"]'
			) as HTMLTextAreaElement;
			const shareImageElem = form?.querySelector(
				'[name="shareImage"]'
			) as HTMLInputElement;
			console.log("shareImageElem", shareTextElem.value, shareImageElem.files);
			// const imageFile = new File(shareImageElem.value as unknown as any, { })
			webShare(shareTextElem.value, shareImageElem.files?.item(0));
		},
		[formRef]
	);
	return (
		<main className={styles.main}>
			<div>
				<form
					suppressHydrationWarning={true}
					ref={formRef}
					onSubmit={handleSubmit}>
					<p>
						<label>
							Image{" "}
							<input
								type="file"
								name="shareImage"
								accept="image/*"
							/>
						</label>
					</p>
					<p>
						<label>
							Text
							<textarea
								name="shareText"
								rows={5}></textarea>
						</label>
					</p>
					<button type="submit">Share</button>
				</form>
			</div>
		</main>
	);
}
