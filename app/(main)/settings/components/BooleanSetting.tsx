import React from "react";

export function BooleanSetting({
	title,
	description,
	options,
}: {
	title: string;
	description: string;
	options: { title: string; onClick: () => void }[];
}) {
	return (
		<div className="w-full flex items-center justify-center gap-7">
			<div className="font-medium">
				<span className={`text-lg font-bold `}>{title}</span>
				<span className={`text-xs`}>{description}</span>
			</div>

			<div className={`flex flex-row gap-4 `}>
				{options.map((o, i) => (
					<div
						className={`bg-card rounded-xl border `}
						key={i}
						onClick={() => {
							o.onClick();
						}}
					>
						{o.title}
					</div>
				))}
			</div>
		</div>
	);
}
