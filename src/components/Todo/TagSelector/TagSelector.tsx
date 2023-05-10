import './TagSelector.css';

export type AvailableTags = 'health' | 'work' | 'home' | 'other';
interface TagSelectorProps {
	onTagSelect: (tag?: AvailableTags) => void;
	supportDeselect?: boolean;
	defaultTag?: 'health' | 'work' | 'home' | 'other';
}
export default function TagSelector({
	supportDeselect = false,
	onTagSelect,
	defaultTag,
}: TagSelectorProps) {
	const availableTags = ['health', 'work', 'home', 'other'] as AvailableTags[];
	const defaultTagIndex = defaultTag ? availableTags.indexOf(defaultTag) : null;
	return (
		<div
			className="tagSelector"
			style={{ margin: '-10px 0', display: 'flex', flexFlow: 'row nowrap' }}
		>
			{availableTags.map((tag, index) => (
				<label
					className={`li-tag li-tag-${tag}`}
					tabIndex={0}
					key={tag}
					onClick={() => onTagSelect(tag)}
					onKeyDown={(e) => {
						if (e.code === 'Space' || e.key === 'Enter') {
							(e.target as HTMLElement).click();
						}
					}}
				>
					<input
						type="radio"
						id="tag"
						name="tag"
						className="radioTab"
						defaultChecked={
							defaultTagIndex !== null && index === defaultTagIndex
						}
					></input>
					{tag}
				</label>
			))}
			{supportDeselect && (
				<label
					className={`li-tag`}
					tabIndex={0}
					onClick={() => onTagSelect()}
					onKeyDown={(e) => {
						if (e.code === 'Space' || e.key === 'Enter') {
							(e.target as HTMLElement).click();
						}
					}}
				>
					<input
						type="radio"
						id="tag"
						name="tag"
						className="radioTab"
						defaultChecked={true}
					></input>
					any
				</label>
			)}
		</div>
	);
}
