import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import { Separator } from '../separator';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const { setArticleState } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [selectedFontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleOpenForm = () => {
		setIsOpen(true);
	};

	const handleResetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState(defaultArticleState);
	};

	const handleCloseForm = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleChangeArticleParams = () => {
		event?.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFontFamily,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener('mousedown', handleCloseForm);
		return () => {
			document.removeEventListener('mousedown', handleCloseForm);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={handleOpenForm} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						onChange={(selected) => setFontFamily(selected)}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={selectedFontSize}
						options={fontSizeOptions}
						onChange={(selected) => setFontSize(selected)}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedFontColor}
						options={fontColors}
						onChange={(selected) => setFontColor(selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedBackgroundColor}
						options={backgroundColors}
						onChange={(selected) => setBackgroundColor(selected)}
					/>
					<Select
						title='Ширина контента'
						selected={selectedContentWidth}
						options={contentWidthArr}
						onChange={(selected) => setContentWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button
							title='Применить'
							type='submit'
							onClick={handleChangeArticleParams}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
