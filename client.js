/* global window */
window.__ModuleLoader__.load({
	id: 'dsh-sidebar-recent',
	factory(require) {
		const React = require('react');
		const h = React.createElement;
		const useState = React.useState;
		const useEffect = React.useEffect;
		const useMemo = React.useMemo;
		const useRef = React.useRef;
		const useCallback = React.useCallback;
		const useLayoutEffect = React.useLayoutEffect;

		/* ------------------------------------------------------------------ *
		 * Icons — path data lifted verbatim from @deepseek-ai/dsh-client-ui-primitives
		 * (the package is not importable from a plugin, so the SVG geometry is
		 * inlined here and rendered with <Icon />).
		 * ------------------------------------------------------------------ */
		const ICONS = {
			search: {vb:16,p:[{d:"M6.58727 11.8586C9.55061 11.8586 11.9529 9.45637 11.9529 6.49304C11.9529 3.5297 9.55061 1.12744 6.58727 1.12744C3.62394 1.12744 1.22168 3.5297 1.22168 6.49304C1.22168 9.45637 3.62394 11.8586 6.58727 11.8586Z",stroke:"currentColor"},{d:"M10.2991 10.3933L14.7783 14.8725",stroke:"currentColor"}]},
			closeFill: {vb:16,p:[{d:"M3.5 3.5L12.5 12.5",stroke:"currentColor"},{d:"M12.5 3.5L3.5 12.5",stroke:"currentColor"}]},
			close: {vb:16,p:[{d:"M2.5 2.5L13.5 13.5",stroke:"currentColor"},{d:"M13.5 2.5L2.5 13.5",stroke:"currentColor"}]},
			plus: {vb:16,p:[{d:"M8 2V14",stroke:"currentColor"},{d:"M2 8H14",stroke:"currentColor"}]},
			projectAdd: {vb:16,p:[{d:"M5.54492 2.06738C5.91034 2.06754 6.26318 2.20149 6.53711 2.44336L7.94043 3.68164V4.7998C7.71462 4.74105 7.50367 4.63139 7.32617 4.47461L5.87598 3.19238C5.78477 3.11185 5.66658 3.06754 5.54492 3.06738H2.94922C2.67322 3.06738 2.44946 3.29145 2.44922 3.56738V12.4326C2.44927 12.7087 2.67311 12.9326 2.94922 12.9326H12.9326C13.2086 12.9325 13.4326 12.7086 13.4326 12.4326V8.53613H14.4326V12.4326C14.4326 13.2609 13.7609 13.9325 12.9326 13.9326H2.94922C2.12083 13.9326 1.44927 13.261 1.44922 12.4326V3.56738C1.44946 2.73916 2.12094 2.06738 2.94922 2.06738H5.54492Z",fill:"currentColor"},{d:"M9.75977 4.50208H14.5509",stroke:"currentColor"},{d:"M12.1492 6.89758L12.1492 2.10642",stroke:"currentColor"}]},
			newChat: {vb:16,p:[{d:"M2.37091 11.2501C1.58745 9.89288 1.32067 8.29835 1.61969 6.76006C1.91872 5.22177 2.76342 3.8433 3.99826 2.87846C5.2331 1.91362 6.77494 1.42737 8.33988 1.50925C9.90482 1.59113 11.3875 2.23562 12.5149 3.32406C13.6425 4.41269 14.3387 5.87206 14.4754 7.4334C14.612 8.99474 14.18 10.5529 13.2587 11.8209C12.3375 13.0888 10.9891 13.9813 9.46194 14.3337C8.18691 14.628 6.85895 14.5294 5.64989 14.0605C5.1712 13.8748 4.76962 13.4932 4.26534 13.3967C3.67413 13.2835 2.95257 13.5598 2.03794 14.3337",stroke:"currentColor"},{d:"M8 5V11",stroke:"currentColor"},{d:"M5 8H11",stroke:"currentColor"}]},
			sliders: {vb:16,p:[{d:"M2.3 5h5.85M12.05 5h1.65"},{d:"M2.3 11h1.65M7.85 11h5.85"}]},
			ellipsis: {vb:16,p:[{d:"M3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9Z",fill:"currentColor"},{d:"M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z",fill:"currentColor"},{d:"M13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9Z",fill:"currentColor"}]},
			folderClose: {vb:16,p:[{d:"M1.50439 3.11059C1.50439 2.55831 1.95211 2.1106 2.50439 2.1106H5.43389C5.67773 2.1106 5.91318 2.19969 6.09593 2.36113L7.71649 3.79265C7.89924 3.95409 8.1347 4.04319 8.3785 4.04319H13.4958C14.0481 4.04319 14.4958 4.4909 14.4958 5.04319V12.8894C14.4958 13.4417 14.0481 13.8894 13.4958 13.8894H2.50439C1.95211 13.8894 1.50439 13.4417 1.50439 12.8894V4.04319V3.11059Z",stroke:"currentColor"},{d:"M3.63501 7.66614H12.3647",stroke:"currentColor"}]},
			folderOpen: {vb:16,p:[{d:"M2.55912 7.93683C2.67584 7.49906 3.0723 7.19446 3.52536 7.19446H13.6491C14.3061 7.19446 14.7846 7.81725 14.6153 8.45209L13.4411 12.856C13.3244 13.2938 12.9279 13.5984 12.4748 13.5984H2.35113C1.69411 13.5984 1.21562 12.9756 1.38489 12.3407L2.55912 7.93683Z",fill:"currentColor"},{d:"M13.6491 6.69446C14.6346 6.69453 15.3522 7.62895 15.0983 8.58118L13.9245 12.9845C13.7494 13.6412 13.1539 14.0988 12.4743 14.0988H2.35126C1.36574 14.0988 0.648153 13.1643 0.902044 12.212L2.07587 7.80774C2.25102 7.15128 2.84567 6.69455 3.52509 6.69446H13.6491ZM3.52509 7.69446C3.29865 7.69455 3.10004 7.84674 3.04169 8.06555L1.86786 12.4698C1.78345 12.7872 2.02285 13.0988 2.35126 13.0988H12.4743C12.7007 13.0988 12.8992 12.9463 12.9577 12.7277L14.1325 8.32336C14.2171 8.00598 13.9776 7.69453 13.6491 7.69446H3.52509Z",fill:"currentColor"},{d:"M4.7666 1.90137C5.13227 1.90144 5.48571 2.03525 5.75977 2.27734L7.27246 3.61328C7.36379 3.69382 7.48174 3.73828 7.60352 3.73828H12.3994C13.2276 3.73841 13.8993 4.41005 13.8994 5.23828V6.7168C13.8183 6.70327 13.735 6.69436 13.6494 6.69434H12.8994V5.23828C12.8993 4.96233 12.6754 4.73841 12.3994 4.73828H7.60352C7.23781 4.73828 6.88446 4.60438 6.61035 4.3623L5.09766 3.02637C5.00636 2.94576 4.88838 2.90144 4.7666 2.90137H2.0498C1.77366 2.90137 1.5498 3.12523 1.5498 3.40137V9.78223L0.902344 12.2119C0.648452 13.1642 1.36604 14.0986 2.35156 14.0986H2.0498C1.2214 14.0986 0.549838 13.427 0.549805 12.5986V3.40137C0.549805 2.57294 1.22138 1.90137 2.0498 1.90137H4.7666Z",fill:"currentColor"}]},
			triangleRight: {vb:16,p:[{d:"M5.5 4.5C5.5 4.40714 5.52586 4.31612 5.57467 4.23713C5.62349 4.15815 5.69334 4.09431 5.77639 4.05279C5.85945 4.01126 5.95242 3.99368 6.0449 4.00202C6.13738 4.01036 6.22572 4.04429 6.3 4.1L10.967 7.6C11.0291 7.64657 11.0795 7.70697 11.1142 7.77639C11.1489 7.84582 11.167 7.92238 11.167 8C11.167 8.07762 11.1489 8.15418 11.1142 8.22361C11.0795 8.29303 11.0291 8.35343 10.967 8.4L6.3 11.9C6.22572 11.9557 6.13738 11.9896 6.0449 11.998C5.95242 12.0063 5.85945 11.9887 5.77639 11.9472C5.69334 11.9057 5.62349 11.8419 5.57467 11.7629C5.52586 11.6839 5.5 11.5929 5.5 11.5V4.5Z",fill:"currentColor"}]},
			tree: {vb:16,p:[{d:"M14 12.05c0 .8-.65 1.45-1.46 1.45H3.46C2.65 13.5 2 12.85 2 12.05v-8.1c0-.8.65-1.45 1.46-1.45h2.4c.49 0 .94.24 1.21.65l.5.73c.27.4.73.65 1.21.65h3.76c.8 0 1.46.65 1.46 1.45v6.02Z"},{d:"M8.7 8.1v3M11.2 8.1v3"}]},
			flat: {vb:16,p:[{d:"M6 3.5h7.5M6 8h7.5M6 12.5h7.5"},{d:"M2.6 3.5h.01M2.6 8h.01M2.6 12.5h.01"}]},
			sortManual: {vb:16,p:[{d:"m5.1 6 2.9-2.9L10.9 6"},{d:"m5.1 10 2.9 2.9 2.9-2.9"}]},
			clock: {vb:16,p:[{d:"M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z",stroke:"currentColor"},{d:"M8 4.31V8.46L11 10.08",stroke:"currentColor"}]},
			edit: {vb:16,p:[{d:"M8.85596 2.69971H4.19971C3.37141 2.69971 2.69992 3.37146 2.69971 4.19971V11.8003C2.69992 12.6285 3.37141 13.3003 4.19971 13.3003H11.8003C12.6283 13.2999 13.3001 12.6283 13.3003 11.8003V7.89893H14.3003V11.8003C14.3001 13.1806 13.1806 14.2999 11.8003 14.3003H4.19971C2.81913 14.3003 1.69992 13.1808 1.69971 11.8003V4.19971C1.69992 2.81918 2.81913 1.69971 4.19971 1.69971H8.85596V2.69971Z",fill:"currentColor"},{d:"M7.7849 8.23878L13.888 2.13574",stroke:"currentColor"}]},
			trash: {vb:16,p:[{d:"M1.28149 3.88831H14.7187",stroke:"currentColor"},{d:"M5.41602 3.88833V2.47962C5.41602 2.29282 5.52492 2.11366 5.71876 1.98157C5.9126 1.84948 6.17551 1.77527 6.44964 1.77527H9.55053C9.82466 1.77527 10.0876 1.84948 10.2814 1.98157C10.4753 2.11366 10.5842 2.29282 10.5842 2.47962V3.88833",stroke:"currentColor"},{d:"M2.57349 3.88831L3.19366 13.2943C3.21937 13.5502 3.33952 13.7872 3.53065 13.9593C3.72178 14.1313 3.97016 14.2259 4.22729 14.2246H11.7728C12.0299 14.2259 12.2783 14.1313 12.4694 13.9593C12.6605 13.7872 12.7807 13.5502 12.8064 13.2943L13.4266 3.88831",stroke:"currentColor"},{d:"M6.44946 6.98926V11.1238",stroke:"currentColor"},{d:"M9.55054 6.98926V11.1238",stroke:"currentColor"}]},
			pinFill: {vb:16,p:[{d:"M9.96976 1.70572L13.1554 3.93629L10.9019 8.12317L11.5158 11.605L10.7192 12.7427L2.52767 7.00693L3.3243 5.86922L6.80612 5.25528L9.96976 1.70572Z",fill:"currentColor",stroke:"currentColor"},{d:"M6.05285 9.47511C6.27284 9.16094 6.70586 9.08458 7.02003 9.30457C7.3342 9.52455 7.41055 9.95757 7.19057 10.2717L3.98587 14.4708L3.21223 13.9291L6.05285 9.47511Z",fill:"currentColor"}]},
			pin: {vb:16,p:[{d:"M9.96976 1.70572L13.1554 3.93629L10.9019 8.12317L11.5158 11.605L10.7192 12.7427L2.52767 7.00693L3.3243 5.86922L6.80612 5.25528L9.96976 1.70572Z",stroke:"currentColor"},{d:"M6.05285 9.47511C6.27284 9.16094 6.70586 9.08458 7.02003 9.30457C7.3342 9.52455 7.41055 9.95757 7.19057 10.2717L3.98587 14.4708L3.21223 13.9291L6.05285 9.47511Z",fill:"currentColor"}]},
			archive: {vb:16,p:[{d:"M13.5 2.5H2.5C1.94772 2.5 1.5 2.94772 1.5 3.5V4.5C1.5 5.05228 1.94772 5.5 2.5 5.5H13.5C14.0523 5.5 14.5 5.05228 14.5 4.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5Z",stroke:"currentColor"},{d:"M2.5 5.5V13.5C2.5 13.7652 2.60536 14.0196 2.79289 14.2071C2.98043 14.3946 3.23478 14.5 3.5 14.5H12.5C12.7652 14.5 13.0196 14.3946 13.2071 14.2071C13.3946 14.0196 13.5 13.7652 13.5 13.5V5.5",stroke:"currentColor"},{d:"M6.5 9.5H9.5",stroke:"currentColor"}]},
			archiveOff: {vb:16,p:[{d:"M2.95 5.7v4.8a2.9 2.9 0 0 0 2.9 2.9h4.3a2.9 2.9 0 0 0 2.9-2.9V5.7"},{d:"m2.2 1.3 11.6 12.8"},{d:"M2.6 2.4L13.4 13.6",stroke:"currentColor"}]},
			archiveDone: {vb:16,p:[{d:"M2.95 5.7v4.8a2.9 2.9 0 0 0 2.9 2.9h4.3a2.9 2.9 0 0 0 2.9-2.9V5.7"},{d:"m6 9.35 1.4 1.4 2.6-2.6"}]},
			unarchive: {vb:20,p:[{d:"M15.8659 2.05975C17.2603 2.05995 18.3913 3.19096 18.3914 4.58527V5.4874C18.3914 6.02747 18.2192 6.52672 17.9303 6.93735C17.9336 6.96524 17.9388 6.99318 17.9388 7.02195V12.8884C17.9388 13.6345 17.9395 14.2379 17.8996 14.7254C17.8642 15.1593 17.7936 15.5499 17.6373 15.9141L17.5654 16.0685C17.278 16.6328 16.8405 17.1046 16.3038 17.434L16.0679 17.5661C15.66 17.7739 15.2196 17.8598 14.7237 17.9003C14.2362 17.9401 13.6327 17.9405 12.8867 17.9405H7.11122C6.36511 17.9405 5.76171 17.9401 5.27418 17.9003C4.84051 17.8649 4.44949 17.7952 4.08545 17.6391L3.93104 17.5661C3.36673 17.2785 2.89392 16.8414 2.56465 16.3044L2.43245 16.0685C2.22473 15.6608 2.13878 15.2211 2.09825 14.7254C2.05841 14.2379 2.05912 13.6345 2.05912 12.8884V7.02195C2.05912 6.99284 2.06422 6.96449 2.06758 6.93629C1.77931 6.52592 1.60858 6.02687 1.60858 5.4874V4.58527C1.60876 3.19084 2.73962 2.05975 4.1341 2.05975H15.8659ZM16.4984 7.92936C16.296 7.98169 16.0847 8.01288 15.8659 8.01291H4.1341C3.91478 8.01291 3.70246 7.98194 3.49955 7.92936V12.8884C3.49955 13.6582 3.50053 14.1927 3.53445 14.608C3.56769 15.0146 3.62923 15.244 3.71635 15.415L3.7925 15.5514C3.98339 15.8627 4.25749 16.1165 4.58464 16.2833L4.72529 16.3435C4.88095 16.3993 5.08638 16.4402 5.39158 16.4651C5.80685 16.4991 6.34138 16.5001 7.11122 16.5001H12.8867C13.6564 16.5001 14.1911 16.499 14.6063 16.4651C15.0128 16.432 15.2423 16.3703 15.4133 16.2833L15.5508 16.2061C15.8618 16.0152 16.116 15.7419 16.2827 15.415L16.3429 15.2732C16.3985 15.1177 16.4396 14.9128 16.4645 14.608C16.4985 14.1927 16.4984 13.6583 16.4984 12.8884V7.92936ZM4.1341 3.50019C3.53511 3.50019 3.0492 3.98631 3.04902 4.58527V5.4874C3.04902 6.08649 3.535 6.57248 4.1341 6.57248H15.8659C16.4648 6.57228 16.951 6.08638 16.951 5.4874V4.58527C16.9509 3.98644 16.4647 3.50038 15.8659 3.50019H4.1341Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"},{d:"M10 14.1V10.1M7.85 12.05L10 9.9L12.15 12.05",stroke:"currentColor"}]},
			queue: {vb:16,p:[{d:"M3.75 6.25C4.7165 6.25 5.5 5.4665 5.5 4.5C5.5 3.5335 4.7165 2.75 3.75 2.75C2.7835 2.75 2 3.5335 2 4.5C2 5.4665 2.7835 6.25 3.75 6.25Z",stroke:"currentColor"},{d:"M7.5 4.5H13.5",stroke:"currentColor"},{d:"M3.75 13.25C4.7165 13.25 5.5 12.4665 5.5 11.5C5.5 10.5335 4.7165 9.75 3.75 9.75C2.7835 9.75 2 10.5335 2 11.5C2 12.4665 2.7835 13.25 3.75 13.25Z",stroke:"currentColor"},{d:"M7.5 11.5H13.5",stroke:"currentColor"}]},
			branch: {vb:16,p:[{d:"M1.01503 8.0001L5.6964 8.0001C6.41913 8.0001 6.78049 8.0001 7.12115 7.91951C7.4232 7.84804 7.71233 7.73014 7.97821 7.57C8.27809 7.38939 8.5364 7.13669 9.05303 6.63129L11.3281 4.40564",stroke:"currentColor"},{d:"M1.01221 7.9999L5.6964 7.9999C6.41913 7.9999 6.78049 7.9999 7.12115 8.08049C7.4232 8.15196 7.71233 8.26986 7.97821 8.43C8.27809 8.61061 8.5364 8.86331 9.05303 9.36871L11.3281 11.5944",stroke:"currentColor"}]},
			copy: {vb:16,p:[{d:"M11.9792 1.53296C13.36 1.53296 14.4792 2.65225 14.4792 4.03296V9.42847C14.4792 10.3756 13.9521 11.1987 13.1755 11.6228V10.3298C13.3652 10.0787 13.4792 9.7674 13.4792 9.42847V4.03296C13.4792 3.20453 12.8077 2.53296 11.9792 2.53296H6.58374C6.27966 2.53301 5.99684 2.6235 5.7605 2.77905H4.42358C4.85652 2.03463 5.66056 1.53304 6.58374 1.53296H11.9792Z",fill:"currentColor"}]},
			check: {vb:16,p:[{d:"M2.25 8.5L5.49732 11.7473C5.90519 12.1552 6.57263 12.1344 6.95426 11.7018L13.75 4",stroke:"currentColor"}]},
			warning: {vb:16,p:[{d:"M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",stroke:"currentColor"},{d:"M8 4.29199V9.79199",stroke:"currentColor"},{d:"M8 10.708V11.708",stroke:"currentColor"}]},
		};

		function Icon(props) {
			const spec = ICONS[props.name];
			if (!spec) return null;
			const size = props.size || 16;
			const paths = spec.p.map(function (p, i) {
				return h('path', {
					key: i,
					d: p.d,
					fill: p.fill,
					stroke: p.stroke || (p.fill ? undefined : 'currentColor'),
					fillRule: p.fillRule,
					clipRule: p.clipRule
				});
			});
			return h('svg', {
				width: size,
				height: size,
				viewBox: '0 0 ' + spec.vb + ' ' + spec.vb,
				fill: 'none',
				strokeWidth: 1,
				className: props.className,
				'aria-hidden': 'true',
				focusable: 'false'
			}, paths);
		}

/* ------------------------------------------------------------------ *
		 * Locale
		 * ------------------------------------------------------------------ */
		const NS = 'sidebar-recent';

		const ZH = {
			'search.aria': '搜索会话',
			'search.placeholder': '搜索会话名称',
			'search.clear': '清除搜索',
			'search.pending': '正在搜索会话历史…',
			'search.noMatches': '无匹配会话',
			'search.hasMore': '仅显示前 {n} 条结果，请缩小搜索范围。',
			'search.results': '搜索结果',
			'search.local': '会话名称',
			'search.history': '会话内容',
			'workspace.add': '添加项目',
			'viewOptions.label': '视图选项',
			'groupBy.label': '分组方式',
			'groupBy.workspace': '按项目',
			'groupBy.workspaceTree': '按项目树',
			'groupBy.flat': '单列表',
			'orderBy.label': '排序方式',
			'orderBy.manual': '手动排序',
			'orderBy.updated': '最近更新',
			'filterBy.label': '筛选会话',
			'viewOptions.hideArchived': '隐藏已归档',
			'viewOptions.showArchived': '全部对话（显示已归档）',
			'viewOptions.onlyArchived': '仅显示已归档',
			'section.workspaces': '项目',
			'section.sessions': '会话',
			'section.recent': '最近',
			'group.ungrouped': '未分组',
			'group.emptyTitle': '暂无项目',
			'sessions.expand': '展开其余 {n} 个会话',
			'sessions.collapse': '收起',
			'sessions.count': '{n} 个会话',
			'sessions.countOne': '1 个会话',
			'rename': '重命名',
			'rename.workspace.title': '重命名项目',
			'field.workspaceName': '项目名称',
			'delete.workspace': '删除项目',
			'delete.desc': '将把“{name}”从项目列表中移除。文件夹与会话记录会保留，其会话将显示在“未分组”下。',
			'delete.pending': '删除中…',
			'conflict.named': '已存在名为“{name}”的项目。',
			'actions.workspace': '项目操作',
			'actions.newSession': '新会话',
			'actions.session': '会话操作',
			'actions.more': '更多操作',
			'menu.fork': '分叉会话',
			'menu.archiveSession': '归档会话',
			'menu.unarchiveSession': '取消归档',
			'menu.pinSession': '置顶会话',
			'menu.unpinSession': '取消置顶',
			'menu.sessionId': '复制 Session ID',
			'menu.openInNew': '打开',
			'toast.sessionIdCopied': 'Session ID 已复制',
			'toast.sessionIdCopyFailed': 'Session ID 复制失败',
			'rename.session.title': '重命名会话',
			'field.sessionName': '会话名称',
			'row.archived': '已归档',
			'row.pinned': '已置顶',
			'session.new': '新会话',
			'session.untitled': '未命名',
			'empty.none': '暂无会话',
			'empty.noneArchived': '暂无已归档会话',
			'empty.viewOthers': '查看其他会话',
			'empty.noMatches': '无匹配结果',
			'archive.confirm.title': '停止并归档此会话？',
			'archive.confirm.desc': '该会话仍在运行。归档会先停止它；之后可在“仅显示已归档”中找到。',
			'archive.confirm.action': '停止并归档',
			'archive.confirm.pending': '归档中…',
			'toast.archived': '会话已归档，可',
			'toast.archivedUndo': '撤销',
			'toast.archivedOr': '或',
			'toast.archivedFilter': '筛选已归档会话',
			'toast.archivedNotOpenable': '已归档的会话无法直接打开，请先取消归档。',
			'toast.pinFailed': '置顶失败',
			'toast.unpinFailed': '取消置顶失败',
			'toast.createFailed': '创建项目失败',
			'toast.forkRequiresOpen': '该会话尚未打开，无法分叉。',
			'appearance.label': '外观',
			'font.size': '字号',
			'font.section': '区块标题',
			'font.group': '项目文件夹',
			'font.row': '会话',
			'font.small': '小',
			'font.normal': '标准',
			'font.large': '大',
			'panelStyle.label': '面板背景',
			'panelStyle.glass': '毛玻璃',
			'panelStyle.blend': '与侧栏融合',
			'panelStyle.contrast': '增强对比',
			'recentAlign.label': '最近栏对齐',
			'showTime.label': '显示时间',
			'split.label': '高度拖动条',
			'recentAlign.global': '全局',
			'recentAlign.independent': '独立',
			'split.hint': '拖动调整上下两栏高度，双击恢复默认',
			'hover.created': '创建于 {time}',
			'hover.copied': '已复制',
			'time.now': '刚刚',
			'time.minutes': '{n}分钟前',
			'time.hours': '{n}小时前',
			'time.days': '{n}天前',
			'date.ymd': '{y}/{m}/{d}',
			'status.running': '正在运行',
			'status.idle': '空闲',
			'status.waitingApproval': '等待批准',
			'status.planReview': '等待计划确认',
			'status.waitingAnswer': '等待回答',
			'status.pending': '等待你的操作',
			'status.unread': '已完成，未查看',
			'status.error': '出错',
			'action.collapse': '收起',
			'action.expand': '展开',
			'action.cancel': '取消',
			'action.confirm': '确定',
			'action.save': '保存',
			'cancel': '取消'
		};

		const EN = {
			'search.aria': 'Search sessions',
			'search.placeholder': 'Search session names',
			'search.clear': 'Clear search',
			'search.pending': 'Searching session history…',
			'search.noMatches': 'No matching sessions',
			'search.hasMore': 'Showing the first {n} results. Narrow your search.',
			'search.results': 'Search results',
			'search.local': 'Session names',
			'search.history': 'Session content',
			'workspace.add': 'Add workspace',
			'viewOptions.label': 'View options',
			'groupBy.label': 'Group by',
			'groupBy.workspace': 'Workspace',
			'groupBy.workspaceTree': 'Workspace tree',
			'groupBy.flat': 'One list',
			'orderBy.label': 'Sort by',
			'orderBy.manual': 'Manual',
			'orderBy.updated': 'Last updated',
			'filterBy.label': 'Filter sessions',
			'viewOptions.hideArchived': 'Hide archived',
			'viewOptions.showArchived': 'All conversations (show archived)',
			'viewOptions.onlyArchived': 'Only archived',
			'section.workspaces': 'Workspaces',
			'section.sessions': 'Conversations',
			'section.recent': 'Recent',
			'group.ungrouped': 'Ungrouped',
			'group.emptyTitle': 'No workspaces yet',
			'sessions.expand': 'Show {n} more sessions',
			'sessions.collapse': 'Collapse',
			'sessions.count': '{n} sessions',
			'sessions.countOne': '1 session',
			'rename': 'Rename',
			'rename.workspace.title': 'Rename workspace',
			'field.workspaceName': 'Workspace name',
			'delete.workspace': 'Delete workspace',
			'delete.desc': '“{name}” will be removed from the workspace list. The folder and its sessions are kept and will appear under “Ungrouped”.',
			'delete.pending': 'Deleting…',
			'conflict.named': 'A workspace named “{name}” already exists.',
			'actions.workspace': 'Workspace actions',
			'actions.newSession': 'New session',
			'actions.session': 'Session actions',
			'actions.more': 'More actions',
			'menu.fork': 'Fork session',
			'menu.archiveSession': 'Archive session',
			'menu.unarchiveSession': 'Unarchive',
			'menu.pinSession': 'Pin session',
			'menu.unpinSession': 'Unpin session',
			'menu.sessionId': 'Copy session ID',
			'menu.openInNew': 'Open',
			'toast.sessionIdCopied': 'Session ID copied',
			'toast.sessionIdCopyFailed': 'Could not copy the session ID',
			'rename.session.title': 'Rename session',
			'field.sessionName': 'Session name',
			'row.archived': 'Archived',
			'row.pinned': 'Pinned',
			'session.new': 'New session',
			'session.untitled': 'Untitled',
			'empty.none': 'No sessions yet',
			'empty.noneArchived': 'No archived sessions',
			'empty.viewOthers': 'View other sessions',
			'empty.noMatches': 'No matches',
			'archive.confirm.title': 'Stop and archive this session?',
			'archive.confirm.desc': 'This session is still running. Archiving stops it first; you can find it again under “Only archived”.',
			'archive.confirm.action': 'Stop and archive',
			'archive.confirm.pending': 'Archiving…',
			'toast.archived': 'Session archived.',
			'toast.archivedUndo': 'Undo',
			'toast.archivedOr': 'or',
			'toast.archivedFilter': 'filter archived sessions',
			'toast.archivedNotOpenable': 'Archived sessions cannot be opened directly. Unarchive it first.',
			'toast.pinFailed': 'Could not pin the session',
			'toast.unpinFailed': 'Could not unpin the session',
			'toast.createFailed': 'Could not create the workspace',
			'toast.forkRequiresOpen': 'This session is not open yet.',
			'appearance.label': 'Appearance',
			'font.size': 'Font size',
			'font.section': 'Section titles',
			'font.group': 'Workspace folders',
			'font.row': 'Sessions',
			'font.small': 'S',
			'font.normal': 'M',
			'font.large': 'L',
			'panelStyle.label': 'Panel background',
			'panelStyle.glass': 'Frosted glass',
			'panelStyle.blend': 'Blend with sidebar',
			'panelStyle.contrast': 'Higher contrast',
			'recentAlign.label': 'Recent pane alignment',
			'showTime.label': 'Show time',
			'split.label': 'Pane splitter',
			'recentAlign.global': 'Global',
			'recentAlign.independent': 'Independent',
			'split.hint': 'Drag to resize the two lists; double-click to reset',
			'hover.created': 'Created {time}',
			'hover.copied': 'Copied',
			'time.now': 'just now',
			'time.minutes': '{n} min ago',
			'time.hours': '{n} h ago',
			'time.days': '{n} d ago',
			'date.ymd': '{y}/{m}/{d}',
			'status.running': 'Running',
			'status.idle': 'Idle',
			'status.waitingApproval': 'Waiting for approval',
			'status.planReview': 'Waiting for plan review',
			'status.waitingAnswer': 'Waiting for an answer',
			'status.pending': 'Waiting for you',
			'status.unread': 'Finished, unread',
			'status.error': 'Error',
			'action.collapse': 'Collapse',
			'action.expand': 'Expand',
			'action.cancel': 'Cancel',
			'action.confirm': 'Confirm',
			'action.save': 'Save',
			'cancel': 'Cancel'
		};

		function interpolate(text, params) {
			if (!params) return text;
			return text.replace(/\{(\w+)\}/g, function (m, key) {
				return params[key] === undefined || params[key] === null ? m : String(params[key]);
			});
		}

		/* The host <-> plugin dictionary hand-off can fall back to the raw key for a
		 * frame; resolve against the bundled dictionary so text never leaks keys. */
		function makeTr(t) {
			return function tr(key, params) {
				let text = null;
				if (typeof t === 'function') {
					try {
						text = t(key, params);
					} catch (err) {
						text = null;
					}
				}
				if (typeof text !== 'string' || text === key || text === '') {
					text = ZH[key] || EN[key] || key;
				}
				return interpolate(text, params);
			};
		}

		/* ------------------------------------------------------------------ *
		 * Small helpers
		 * ------------------------------------------------------------------ */
		function pad2(n) {
			return n < 10 ? '0' + n : String(n);
		}

		function timeAgo(ts, now) {
			const ms = typeof ts === 'number' ? ts : Date.parse(ts);
			if (!ms || isNaN(ms)) return '';
			const diff = Math.max(0, now - ms);
			const minute = 60000;
			const hour = 3600000;
			const day = 86400000;
			if (diff < minute) return { unit: 'now' };
			if (diff < hour) return { unit: 'minutes', n: Math.floor(diff / minute) };
			if (diff < day) return { unit: 'hours', n: Math.floor(diff / hour) };
			if (diff < day * 30) return { unit: 'days', n: Math.floor(diff / day) };
			const d = new Date(ms);
			return { unit: 'date', y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
		}

		function timeText(ts, now, tr) {
			const value = timeAgo(ts, now);
			if (value.unit === 'now') return tr('time.now');
			if (value.unit === 'minutes') return tr('time.minutes', { n: value.n });
			if (value.unit === 'hours') return tr('time.hours', { n: value.n });
			if (value.unit === 'days') return tr('time.days', { n: value.n });
			return tr('date.ymd', { y: value.y, m: pad2(value.m), d: pad2(value.d) });
		}

		function basename(path) {
			if (!path) return '';
			const trimmed = String(path).replace(/[\\/]+$/, '');
			const parts = trimmed.split(/[\\/]/);
			return parts[parts.length - 1] || trimmed;
		}

		function sessionTitle(node, tr) {
			if (!node) return tr('session.untitled');
			if (node.blank) return tr('session.new');
			return node.title || node.displayTitle || tr('session.untitled');
		}

		function workspaceName(item) {
			if (!item) return '';
			const named = typeof item.title === 'string' ? item.title.trim() : '';
			if (named) return named;
			return basename(item.cwd || item.path || '');
		}

		const HIDE_ARCHIVED = 'default';

		function archivedSetOf(snapshot) {
			const ids = snapshot && snapshot.archivedSessionIds;
			if (!ids) return new Set();
			if (ids instanceof Set) return ids;
			if (Array.isArray(ids)) return new Set(ids);
			return new Set(Object.keys(ids));
		}

		function pinnedSetOf(snapshot) {
			const ids = snapshot && snapshot.pinnedSessionIds;
			if (!ids) return new Set();
			if (ids instanceof Set) return ids;
			if (Array.isArray(ids)) return new Set(ids);
			return new Set(Object.keys(ids));
		}

		function currentSessionId(byId) {
			const values = Object.values(byId || {});
			for (let i = 0; i < values.length; i++) {
				const session = values[i];
				if (session && session.retainedBy && (session.retainedBy.mainView || 0) > 0) return session.id;
			}
			return undefined;
		}

		function statusOf(statuses, id) {
			if (!statuses) return null;
			let raw = null;
			try {
				raw = typeof statuses.get === 'function' ? statuses.get(id) : statuses[id];
			} catch (error) {
				raw = null;
			}
			if (!raw) return null;
			if (typeof raw === 'string') return { phase: raw };
			return raw;
		}

		function statusKind(status) {
			if (!status || typeof status !== 'object') return '';
			if (status.error || status.lastError || status.failed) return 'error';
			const pending = status.pendingInteraction;
			const kind = pending && typeof pending === 'object' ? pending.kind : '';
			if (kind === 'approval' || kind === 'plan-review' || kind === 'question') return 'pending';
			if (status.running) return 'running';
			if (status.completionUnread === true) return 'unread';
			if (status.phase === 'error') return 'error';
			return '';
		}

		/* ------------------------------------------------------------------ *
		 * Persisted view state
		 * ------------------------------------------------------------------ */
		const VIEW_KEY = 'dsh.sidebar-recent.view.v8';
		const LEGACY_VIEW_KEY = 'dsh.sidebar-recent.view.v9';
		const BACKUP_VIEW_KEY = VIEW_KEY + '.backup';

		function defaultView() {
			return {
				groupBy: 'workspace',
				orderBy: 'updated',
				archivedFilter: HIDE_ARCHIVED,
				expanded: null,
				wsCollapsed: false,
				recentCollapsed: false,
				collapsedNodes: [],
				groupOrder: [],
				fontSection: FONT_DEFAULTS.section,
				fontGroup: FONT_DEFAULTS.group,
				fontRow: FONT_DEFAULTS.row,
				panelStyle: 'blend',
			indicatorSide: 'left',
			recentAlign: 'global',
			showTime: false,
			split: true,
				wsRatio: null,
		wsPx: null,
				recentRatio: null
			};
		}

		const FONT_DEFAULTS = { section: 14, group: 14.5, row: 14 };
		const FONT_MIN = 8;
		const FONT_MAX = 22;
		const FONT_STEP = 0.5;
		const FONT_LEGACY = {
			section: { small: 10.6, normal: 11.5, large: 13 },
			group: { small: 11.6, normal: 12.6, large: 14.2 },
			row: { small: 11.5, normal: 12.5, large: 14.1 }
		};

		let FOCUS_WS_ID = '';

function setFocusWorkspaceId(id) {
	FOCUS_WS_ID = id || '';
}

function getFocusWorkspaceId() {
	return FOCUS_WS_ID;
}

function updateScrollFades(event) {
	const el = event && event.currentTarget;
	if (!el) return;
	const rest = el.scrollHeight - el.clientHeight - el.scrollTop;
	const top = el.scrollTop > 0 ? Math.min(10, el.scrollTop) : 0;
	const bottom = rest > 0 ? Math.min(10, rest) : 0;
	el.style.setProperty('--sr-fade-top', top + 'px');
	el.style.setProperty('--sr-fade-bottom', bottom + 'px');
}

function clampFont(value) {
			const n = Math.round(value * 10) / 10;
			return Math.min(FONT_MAX, Math.max(FONT_MIN, n));
		}

		function toFontSize(raw, slot) {
			if (typeof raw === 'number' && isFinite(raw)) return clampFont(raw);
			if (typeof raw === 'string' && FONT_LEGACY[slot] && FONT_LEGACY[slot][raw] !== undefined) {
				return FONT_LEGACY[slot][raw];
			}
			return FONT_DEFAULTS[slot];
		}

		function readView() {
			try {
				const raw = window.localStorage.getItem(VIEW_KEY)
					|| window.localStorage.getItem(LEGACY_VIEW_KEY)
					|| window.localStorage.getItem(BACKUP_VIEW_KEY);
				if (!raw) return null;
				const parsed = JSON.parse(raw);
				if (!parsed || typeof parsed !== 'object') return null;
				const out = defaultView();
				if (parsed.groupBy === 'workspace' || parsed.groupBy === 'workspace-tree' || parsed.groupBy === 'flat') out.groupBy = parsed.groupBy;
				if (parsed.orderBy === 'manual' || parsed.orderBy === 'updated') out.orderBy = parsed.orderBy;
				if (parsed.archivedFilter === 'default' || parsed.archivedFilter === 'show' || parsed.archivedFilter === 'only') out.archivedFilter = parsed.archivedFilter;
				if (Array.isArray(parsed.expanded)) out.expanded = parsed.expanded.filter(function (v) { return typeof v === 'string'; });
				out.wsCollapsed = !!parsed.wsCollapsed;
				out.recentCollapsed = !!parsed.recentCollapsed;
				if (Array.isArray(parsed.collapsedNodes)) out.collapsedNodes = parsed.collapsedNodes.filter(function (v) { return typeof v === 'string'; });
				if (Array.isArray(parsed.groupOrder)) out.groupOrder = parsed.groupOrder.filter(function (v) { return typeof v === 'string'; });
				if (parsed.fontSection !== undefined) out.fontSection = toFontSize(parsed.fontSection, 'section');
				if (parsed.fontGroup !== undefined) out.fontGroup = toFontSize(parsed.fontGroup, 'group');
				if (parsed.fontRow !== undefined) out.fontRow = toFontSize(parsed.fontRow, 'row');
				if (parsed.panelStyle === 'glass' || parsed.panelStyle === 'blend' || parsed.panelStyle === 'contrast') out.panelStyle = parsed.panelStyle;
			if (parsed.indicatorSide === 'left' || parsed.indicatorSide === 'right') out.indicatorSide = parsed.indicatorSide;
				if (parsed.recentAlign === 'global' || parsed.recentAlign === 'independent') out.recentAlign = parsed.recentAlign;
			if (typeof parsed.showTime === 'boolean') out.showTime = parsed.showTime;
			if (typeof parsed.split === 'boolean') out.split = parsed.split;
				if (typeof parsed.wsRatio === 'number' && parsed.wsRatio >= 0.12 && parsed.wsRatio <= 0.9) out.wsRatio = parsed.wsRatio;
			if (typeof parsed.wsPx === 'number' && parsed.wsPx >= 40 && parsed.wsPx <= 4000) out.wsPx = parsed.wsPx;
				return out;
			} catch (err) {
				return null;
			}
		}

		function writeView(view) {
			try {
				const prev = window.localStorage.getItem(VIEW_KEY);
				if (prev) window.localStorage.setItem(BACKUP_VIEW_KEY, prev);
				window.localStorage.setItem(VIEW_KEY, JSON.stringify(view));
			} catch (err) {
				/* storage may be unavailable; the session keeps working in memory */
			}
		}

/* ------------------------------------------------------------------ *
		 * Primitives (the shipped primitives package is not importable, so the
		 * menu / dialog / toast surfaces are re-created with theme tokens).
		 * ------------------------------------------------------------------ */
		function useOutsideClose(ref, open, onClose) {
			useEffect(function () {
				if (!open) return undefined;
				const onDown = function (event) {
					const el = ref.current;
					if (!el || el.contains(event.target)) return;
					if (event.target && event.target.closest && event.target.closest('[data-menu-trigger]')) return;
					onClose();
				};
				const onKey = function (event) {
					if (event.key === 'Escape') {
						event.stopPropagation();
						onClose();
					}
				};
				document.addEventListener('pointerdown', onDown, true);
				document.addEventListener('mousedown', onDown, true);
				document.addEventListener('keydown', onKey, true);
				return function () {
					document.removeEventListener('pointerdown', onDown, true);
					document.removeEventListener('mousedown', onDown, true);
					document.removeEventListener('keydown', onKey, true);
				};
			}, [open, onClose]);
		}

		function StepperRow(props) {
			const item = props.item;
			const [editing, setEditing] = useState(null);
			function commit(raw) {
				const n = parseFloat(raw);
				setEditing(null);
				if (isFinite(n)) props.onSelect(item.id + ':' + n);
			}
			const dec = Math.round((item.value - item.step) * 10) / 10;
			const inc = Math.round((item.value + item.step) * 10) / 10;
			return h('div', { className: 'sr-menu-chips' }, [
				h('span', { key: 'l', className: 'sr-menu-chips-label' }, item.label),
				h('span', { key: 's', className: 'sr-stepper' }, [
					h('button', {
						key: 'm',
						type: 'button',
						className: 'sr-chip sr-stepper-btn',
						disabled: item.value <= item.min,
						'aria-label': 'smaller',
						onClick: function (event) {
							event.preventDefault();
							event.stopPropagation();
							props.onSelect(item.id + ':' + dec);
						}
					}, '\u2212'),
					editing === null
						? h('button', {
							key: 'v',
							type: 'button',
							className: 'sr-stepper-val sr-stepper-edit',
							title: 'edit',
							onClick: function (event) {
								event.preventDefault();
								event.stopPropagation();
								setEditing(String(item.value));
							}
						}, String(item.value) + 'px')
						: h('input', {
							key: 'i',
							className: 'sr-stepper-input',
							autoFocus: true,
							defaultValue: String(item.value),
							onBlur: function (event) { commit(event.currentTarget.value); },
							onKeyDown: function (event) {
								if (event.key === 'Enter') { event.preventDefault(); commit(event.currentTarget.value); }
								else if (event.key === 'Escape') { setEditing(null); }
								event.stopPropagation();
							}
						}),
					h('button', {
						key: 'p',
						type: 'button',
						className: 'sr-chip sr-stepper-btn',
						disabled: item.value >= item.max,
						'aria-label': 'larger',
						onClick: function (event) {
							event.preventDefault();
							event.stopPropagation();
							props.onSelect(item.id + ':' + inc);
						}
					}, '+')
				])
			]);
		}

		function Menu(props) {
			const ref = useRef(null);
			const [pos, setPos] = useState(null);
			const open = !!props.open;

			React.useLayoutEffect(function () {
				if (!open) {
					setPos(null);
					return;
				}
				const el = ref.current;
				const width = el ? el.offsetWidth : 216;
				const height = el ? el.offsetHeight : 260;
				const point = props.point;
				const anchor = props.anchor;
				let left;
				let top;
				if (point) {
					left = point.x + 6;
					top = point.y + 6;
					if (left + width > window.innerWidth - 8) left = Math.max(8, point.x - width - 2);
					if (top + height > window.innerHeight - 8) top = Math.max(8, point.y - height - 2);
				} else if (anchor) {
					left = props.align === 'end' ? anchor.right - width : anchor.left;
					top = anchor.bottom + 4;
					if (top + height > window.innerHeight - 8) {
						top = Math.max(8, anchor.top - height - 4);
					}
				} else {
					return;
				}
				top = Math.max(8, Math.min(top, window.innerHeight - height - 8));
				left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
				setPos({ top: top, left: left });
			}, [open, props.anchor, props.point, props.items]);

			useOutsideClose(ref, open, props.onClose || function () {});

			if (!open) return null;
			const selected = props.selectedIds || [];
			const items = props.items || [];
			const children = items.map(function (item, index) {
				if (item.type === 'separator') {
					return h('div', { key: 'sep' + index, className: 'sr-menu-sep', role: 'separator' });
				}
				if (item.type === 'label') {
					return h('div', { key: 'lab' + index, className: 'sr-menu-label' }, item.text);
				}
					if (item.type === 'stepper') {
						return h(StepperRow, { key: item.id, item: item, onSelect: props.onSelect });
					}
					if (item.type === 'chips') {
					return h('div', { key: 'chips' + index, className: 'sr-menu-chips' }, [
						h('span', { key: 'l', className: 'sr-menu-chips-label' }, item.label),
						h('span', { key: 'g', className: 'sr-chips' }, (item.options || []).map(function (option) {
							const on = option.id === item.value;
							return h('button', {
								key: option.id,
								type: 'button',
								className: 'sr-chip' + (on ? ' is-on' : ''),
								onClick: function (event) {
									event.preventDefault();
									event.stopPropagation();
									props.onSelect(item.id + ':' + option.id);
								}
							}, option.label);
						}))
					]);
				}
				const isOn = selected.indexOf(item.id) >= 0;
				return h('button', {
					key: item.id || 'item' + index,
					type: 'button',
					className: 'sr-menu-item' + (isOn ? ' is-selected' : '') + (item.danger ? ' is-danger' : ''),
					disabled: !!item.disabled,
					onClick: function (event) {
						event.preventDefault();
						event.stopPropagation();
						props.onSelect(item.id);
					}
				}, [
					h('span', { key: 'i', className: 'sr-menu-icon' }, item.icon || null),
					h('span', { key: 'l', className: 'sr-menu-text' }, item.label),
					h('span', { key: 'c', className: 'sr-menu-check' }, isOn ? h(Icon, { name: 'check', size: 14 }) : null)
				]);
			});

			return h('div', {
				ref: ref,
				className: 'sr-menu' + (props.className ? ' ' + props.className : ''),
				role: 'menu',
				style: pos ? { top: pos.top + 'px', left: pos.left + 'px' } : { top: '-9999px', left: '-9999px' }
			}, children);
		}

		function Dialog(props) {
			const open = !!props.open;
			useEffect(function () {
				if (!open) return undefined;
				const onKey = function (event) {
					if (event.key === 'Escape') {
						event.stopPropagation();
						if (props.onClose) props.onClose();
					}
				};
				document.addEventListener('keydown', onKey, true);
				return function () {
					document.removeEventListener('keydown', onKey, true);
				};
			}, [open, props.onClose]);

			if (!open) return null;
			const footer = (props.footer || []).map(function (action, index) {
				return h('button', {
					key: index,
					type: 'button',
					className: 'sr-btn' + (action.primary ? ' is-primary' : '') + (action.danger ? ' is-danger' : '') + (action.ghost ? ' is-ghost' : ''),
					disabled: !!action.disabled,
					onClick: action.onClick
				}, action.label);
			});
			return h('div', { className: 'sr-overlay', onMouseDown: function (event) {
				if (event.target === event.currentTarget && props.onClose) props.onClose();
			} }, h('div', { className: 'sr-dialog', role: 'dialog', 'aria-modal': 'true' }, [
				props.title ? h('div', { key: 't', className: 'sr-dialog-title' }, props.title) : null,
				props.description ? h('div', { key: 'd', className: 'sr-dialog-desc' }, props.description) : null,
				props.children ? h('div', { key: 'b', className: 'sr-dialog-body' }, props.children) : null,
				footer.length ? h('div', { key: 'f', className: 'sr-dialog-footer' }, footer) : null
			]));
		}

		function TextField(props) {
			const ref = useRef(null);
			useEffect(function () {
				if (!props.open) return;
				const el = ref.current;
				if (!el) return;
				el.focus();
				el.select();
			}, [props.open]);
			return h('input', {
				ref: ref,
				className: 'sr-input',
				type: 'text',
				value: props.value,
				placeholder: props.placeholder,
				disabled: !!props.disabled,
				onChange: function (event) {
					props.onChange(event.target.value);
				},
				onKeyDown: function (event) {
					if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
						event.preventDefault();
						if (props.onSubmit) props.onSubmit();
					}
				}
			});
		}

		function IconButton(props) {
			return h('button', {
				type: 'button',
				className: 'sr-icon-btn' + (props.active ? ' is-active' : '') + (props.className ? ' ' + props.className : ''),
				title: props.title,
				'aria-label': props.title,
				'data-menu-trigger': props.menuTrigger ? '1' : undefined,
				disabled: !!props.disabled,
				onClick: props.onClick
			}, h(Icon, { name: props.icon, size: props.size || 16 }));
		}

		function ToastView(props) {
			const toast = props.toast;
			if (!toast) return null;
			return h('div', { className: 'sr-toast', role: 'status' }, [
				h('span', { key: 'm', className: 'sr-toast-text' }, toast.message),
				toast.actionLabel ? h('button', {
					key: 'a',
					type: 'button',
					className: 'sr-toast-link',
					onClick: function () {
						toast.onAction();
						props.onClose();
					}
				}, toast.actionLabel) : null,
				toast.altLabel ? h('span', { key: 'o', className: 'sr-toast-or' }, props.tr('toast.archivedOr')) : null,
				toast.altLabel ? h('button', {
					key: 'b',
					type: 'button',
					className: 'sr-toast-link',
					onClick: function () {
						toast.onAlt();
						props.onClose();
					}
				}, toast.altLabel) : null,
				h('button', {
					key: 'x',
					type: 'button',
					className: 'sr-toast-close',
					'aria-label': 'close',
					onClick: props.onClose
				}, h(Icon, { name: 'closeFill', size: 12 }))
			]);
		}

		function SectionHeader(props) {
			return h('div', { className: 'sr-section-header', onClick: props.onToggle }, [
				h('span', { key: 'label', className: 'sr-section-label' }, props.label),
				h('svg', {
					key: 'chev',
					className: 'sr-chev' + (props.collapsed ? '' : ' is-open'),
					width: 10,
					height: 10,
					viewBox: '0 0 16 16',
					fill: 'none',
					stroke: 'currentColor',
					strokeWidth: 1.7,
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					'aria-hidden': 'true'
				}, h('path', { d: 'M6 3.5 10.5 8 6 12.5' })),
				h('span', { key: 'spring', className: 'sr-spring' }),
				props.actions ? h('span', {
					key: 'acts',
					className: 'sr-head-actions',
					onClick: function (event) { event.stopPropagation(); }
				}, props.actions) : null
			]);
		}

/* ------------------------------------------------------------------ *
		 * Derived data
		 * ------------------------------------------------------------------ */
		const MAX_RECENT = 300;
		const RAIL_ITEMS = 8;
		const SEARCH_DEBOUNCE = 260;
		const SEARCH_RESULT_LIMIT = 20;

		function archivedMatch(id, archivedSet, mode) {
			const isArchived = archivedSet.has(id);
			if (mode === 'only') return isArchived;
			if (mode === 'show') return true;
			return !isArchived;
		}

		function baseVisible(session, currentId) {
			if (!session) return false;
			if (session.origin === 'subagent') return false;
			if (session.blank && session.id !== currentId) return false;
			return true;
		}

		function orderIds(ids, byId, orderBy, pinnedSet) {
			const out = ids.slice();
			if (orderBy === 'updated') {
				out.sort(function (a, b) {
					const av = (byId[a] && byId[a].updatedAt) || 0;
					const bv = (byId[b] && byId[b].updatedAt) || 0;
					if (bv !== av) return bv - av;
					return a < b ? -1 : a > b ? 1 : 0;
				});
			}
			if (pinnedSet && pinnedSet.size) {
				const pinned = [];
				const rest = [];
				out.forEach(function (id) {
					if (pinnedSet.has(id)) pinned.push(id);
					else rest.push(id);
				});
				return pinned.concat(rest);
			}
			return out;
		}

		function collectVisible(opts) {
			const list = opts.list || {};
			const byId = list.byId || {};
			const ids = list.ids || [];
			const archivedSet = opts.archivedSet;
			const mode = opts.archivedFilter;
			const out = [];
			ids.forEach(function (id) {
				const session = byId[id];
				if (!baseVisible(session, opts.currentId)) return;
				if (!archivedMatch(id, archivedSet, mode)) return;
				out.push(id);
			});
			return orderIds(out, byId, opts.orderBy, opts.pinnedSet);
		}

		function groupLabelOf(item) {
			return workspaceName(item);
		}

		function parentDirOf(path) {
			const p = String(path || '').replace(/[\\/]+$/, '');
			if (!p) return '';
			const slash = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
			if (slash <= 0) return '';
			return p.slice(0, slash);
		}

		function buildWorkspaceGroups(opts) {
			const items = opts.items || [];
			const byId = opts.byId || {};
			const known = new Set();
			const groups = [];

			items.forEach(function (item) {
				const wsId = item.workspaceId;
				const ids = [];
				(item.sessionIds || []).forEach(function (sessionId) {
					known.add(sessionId);
					const session = byId[sessionId];
					if (!baseVisible(session, opts.currentId)) return;
					if (!archivedMatch(sessionId, opts.archivedSet, opts.archivedFilter)) return;
					ids.push(sessionId);
				});
				groups.push({
					id: wsId,
					kind: 'workspace',
					title: groupLabelOf(item),
					path: String(item.cwd || item.path || ''),
					sessions: orderIds(ids, byId, opts.orderBy, opts.pinnedSet),
					item: item
				});
			});

			const ungrouped = [];
			(opts.allIds || []).forEach(function (id) {
				if (known.has(id)) return;
				const session = byId[id];
				if (!baseVisible(session, opts.currentId)) return;
				if (!archivedMatch(id, opts.archivedSet, opts.archivedFilter)) return;
				ungrouped.push(id);
			});
			if (ungrouped.length) {
				groups.push({
					id: '__ungrouped',
					kind: 'ungrouped',
					title: opts.tr('group.ungrouped'),
					path: '',
					sessions: orderIds(ungrouped, byId, opts.orderBy, opts.pinnedSet),
					item: null
				});
			}
			return groups;
		}

		function buildParentGroups(groups) {
			const buckets = new Map();
			const loose = [];
			groups.forEach(function (group) {
				if (group.kind !== 'workspace') {
					loose.push(null);
					return;
				}
				const dir = parentDirOf(group.path);
				if (!dir) {
					buckets.set('__root__' + group.id, { key: '__root__' + group.id, label: '', children: [group] });
					return;
				}
				const existing = buckets.get(dir);
				if (existing) {
					existing.children.push(group);
				} else {
					buckets.set(dir, { key: dir, label: basename(dir) || dir, dir: dir, children: [group] });
				}
			});
			const out = [];
			const emitted = new Set();
			groups.forEach(function (group) {
				if (group.kind !== 'workspace') {
					out.push({ key: group.id, label: '', children: [group], loose: true });
					return;
				}
				const dir = parentDirOf(group.path);
				if (!dir) {
					if (!emitted.has(group.id)) {
						emitted.add(group.id);
						out.push({ key: '__root__' + group.id, label: '', children: [group] });
					}
					return;
				}
				if (emitted.has(dir)) return;
				emitted.add(dir);
				const bucket = buckets.get(dir);
				out.push({ key: dir, label: bucket.label, dir: dir, children: bucket.children });
			});
			return out;
		}

		function buildTreeGroups(groups) {
			const containers = buildParentGroups(groups);
			return containers;
		}

		/* ------------------------------------------------------------------ *
		 * Rows
		 * ------------------------------------------------------------------ */
		/* ---------------- marquee for clipped titles ---------------- */

const MARQUEE_PAD = 16;

function onTitleEnter(event) {
	const el = event.currentTarget;
	if (!el || !el.scrollWidth) return;
	const over = el.scrollWidth - el.clientWidth;
	if (over <= 12) return;
	const inner = el.firstElementChild;
	if (!inner) return;
	const shift = over + MARQUEE_PAD;
	inner.style.setProperty('--sr-shift', '-' + shift + 'px');
	inner.style.setProperty('--sr-dur', Math.max(1.3, Math.min(8, shift / 26)).toFixed(2) + 's');
	inner.classList.add('is-marquee');
	el.classList.add('is-scrolling');
}

function onTitleLeave(event) {
	const el = event.currentTarget;
	if (!el) return;
	const inner = el.firstElementChild;
	if (inner) inner.classList.remove('is-marquee');
	el.classList.remove('is-scrolling');
}

function DotSvg(size, color) {
	const s = size || 8;
	return h('svg', {
		key: 'd',
		className: 'sr-dot-svg',
		width: s,
		height: s,
		viewBox: '0 0 ' + s + ' ' + s,
		focusable: 'false',
		'aria-hidden': 'true'
	}, h('circle', { key: 'c', cx: s / 2, cy: s / 2, r: s / 2, fill: color || '#3964FE' }));
}

function StatusDot(props) {
			if (!props.kind) return null;
			const label = props.tr('status.' + props.kind);
			if (props.kind === 'unread') {
				return h('span', {
					className: 'sr-dot is-unread',
					title: label,
					'aria-label': label
				}, DotSvg(8));
			}
			return h('span', {
				className: 'sr-status is-' + props.kind,
				role: 'img',
				title: label,
				'aria-label': label
			});
		}

		function SessionRow(props) {
			const node = props.node;
			const title = sessionTitle(node, props.tr);
			const archived = props.archived;
			const pinned = props.pinned;
			const classes = ['sr-row'];
			if (props.current) classes.push('is-current');
			if (archived) classes.push('is-archived');
			if (props.menuOpen) classes.push('is-menu-open');
			if (props.dropBefore) classes.push('is-drop-before');
			if (props.dragging) classes.push('is-dragging');

			const timeLabel = props.showTime && node ? timeTextOf(node.updatedAt, props.now, props.tr) : '';

			function buildChildren() {
				const lead = h('span', {
					key: 'lead',
					className: 'sr-row-lead' + (props.side === 'right' ? ' is-right' : '')
				}, [
					props.statusRight ? null : h(StatusDot, { key: 'd', kind: props.status, tr: props.tr }),
					pinned && props.side !== 'right' ? h(Icon, { key: 'p', name: 'pinFill', size: 11, className: 'sr-pin' }) : null
				]);
				const out = [];
				if (props.side !== 'right') out.push(lead);
				out.push(h('span', {
					key: 't',
					className: 'sr-row-title',
					onMouseEnter: onTitleEnter,
					onMouseLeave: onTitleLeave
				}, h('span', { key: 'i', className: 'sr-row-title-in' }, title)));
				if (archived) out.push(h('span', { key: 'a', className: 'sr-row-badge' }, props.tr('row.archived')));
				if (timeLabel) out.push(h('span', { key: 'time', className: 'sr-row-time' }, timeLabel));
				if (props.side === 'right') out.push(lead);
				const menuBtn = h('span', { key: 'menu', className: 'sr-row-more' }, h(IconButton, {
					icon: 'ellipsis',
					size: 14,
					title: props.tr('actions.session'),
					menuTrigger: true,
					onClick: props.onMore
				}));
				if (props.statusRight && props.status) {
					out.push(h('span', { key: 'tail', className: 'sr-row-tail' }, [
						h('span', { key: 'st', className: 'sr-row-tail-status' }, h(StatusDot, { kind: props.status, tr: props.tr })),
						menuBtn
					]));
				} else {
					out.push(menuBtn);
				}
				return out;
			}

			return h('div', {
				className: classes.join(' '),
				ref: props.rowRef,
				'data-session': props.id,
				draggable: props.draggable ? 'true' : 'false',
				onClick: function (event) {
					if (event.defaultPrevented) return;
					props.onOpen();
				},
				onDragStart: props.onDragStart,
				onDragEnd: props.onDragEnd,
				onDragOver: props.onDragOver,
				onDragLeave: props.onDragLeave,
				onDrop: props.onDrop,
				title: props.tr('hover.created', { time: timeTextOf(node && node.updatedAt, props.now, props.tr) })
			}, buildChildren());
		}

		function timeTextOf(value, now, tr) {
			if (!value) return '';
			return timeText(value, now, tr);
		}

		function WorkspaceRow(props) {
			const group = props.group;
			const count = group.sessions.length;
			const countLabel = count === 1 ? props.tr('sessions.countOne') : props.tr('sessions.count', { n: count });
			return h('div', {
				className: 'sr-ws-row' + (props.collapsed ? ' is-collapsed' : '') + (props.dropTarget ? ' is-drop-target' : ''),
				onDragOver: props.onDragOver,
				onDrop: props.onDrop,
				onDragLeave: props.onDragLeave
			}, [
				h('button', {
					key: 'head',
					type: 'button',
					className: 'sr-ws-head',
					'aria-expanded': props.collapsed ? 'false' : 'true',
					onClick: props.onToggle,
					onContextMenu: props.onContextMenu
				}, [
					h(Icon, { key: 'f', name: props.collapsed ? 'folderClose' : 'folderOpen', size: 14, className: 'sr-ws-icon' }),
					h('span', { key: 't', className: 'sr-ws-title' }, group.title),
				]),
				props.status ? h('span', {
				key: 'st',
				className: 'sr-ws-status',
				title: props.tr('status.' + props.status)
			}, DotSvg(8, props.status === 'pending' ? 'var(--dsw-alias-state-warn-primary,#d38b1a)' : props.status === 'error' ? 'var(--dsw-alias-state-error-primary,#d13438)' : '#3964FE')) : null,
			h('span', { key: 'more', className: 'sr-row-more sr-ws-more' }, [
					h(IconButton, {
						key: 'm',
						icon: 'ellipsis',
						size: 14,
						title: props.tr('actions.workspace'),
						menuTrigger: true,
						onClick: props.onMore
					}),
					h(IconButton, {
						key: 'n',
						icon: 'newChat',
						size: 14,
						title: props.tr('actions.newSession'),
						onClick: props.onNewSession
					})
				])
			]);
		}

		function EmptyState(props) {
			return h('div', { className: 'sr-empty' }, [
				h(Icon, { key: 'i', name: props.icon || 'queue', size: 22 }),
				h('div', { key: 't', className: 'sr-empty-text' }, props.text),
				props.action ? h('button', {
					key: 'a',
					type: 'button',
					className: 'sr-empty-action',
					onClick: props.action.onClick
				}, props.action.label) : null
			]);
		}

/* ------------------------------------------------------------------ *
		 * The browser
		 * ------------------------------------------------------------------ */
		function SidebarRecent(props) {
			const tr = useMemo(function () {
				return makeTr(props.t);
			}, [props.t]);

			const list = props.useSessions(function (state) { return state; });
			const wsSnapshot = props.useWorkspaces(function (state) { return state; });
			const statuses = props.useSessionStatus ? props.useSessionStatus(function (state) { return state; }) : null;

			const [view, setView] = useState(function () {
				return readView() || defaultView();
			});
			const [now, setNow] = useState(function () { return Date.now(); });
			const [searchOpen, setSearchOpen] = useState(false);
			const [query, setQuery] = useState('');
			const [remote, setRemote] = useState({ query: '', status: 'idle', items: [], hasMore: false });
			const [menu, setMenu] = useState(null);
			const [dialog, setDialog] = useState(null);
			const [toast, setToast] = useState(null);
			const [drag, setDrag] = useState(null);
			const [dropTarget, setDropTarget] = useState(null);
			const [resizeLive, setResizeLive] = useState(null);
			const [appearanceOpen, setAppearanceOpen] = useState(false);
			const [wsContentH, setWsContentH] = useState(0);
			const wsInnerRef = useRef(null);
			const animTimer = useRef(0);
			const [animating, setAnimating] = useState(false);
			const [groupDrag, setGroupDrag] = useState(null);
			const groupHold = useRef(0);
			const groupDragMeta = useRef(null);
			const dragTargetRef = useRef(-1);

			useEffect(function () {
				try {
					if (!window.localStorage.getItem(VIEW_KEY)) writeView(view);
				} catch (err) {
					/* ignore storage errors */
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);

			useLayoutEffect(function () {
				const el = wsInnerRef.current;
				if (!el) return undefined;
				let frame = 0;
				function measure() {
					frame = 0;
					const target = el.firstElementChild || el;
					const next = target.scrollHeight + 6;
					setWsContentH(function (prev) { return Math.abs(prev - next) < 1 ? prev : next; });
				}
				function schedule() {
					if (frame) return;
					frame = window.requestAnimationFrame(measure);
				}
				measure();
				if (typeof ResizeObserver === 'function') {
					const ro = new ResizeObserver(schedule);
					ro.observe(el);
					return function () {
						if (frame) window.cancelAnimationFrame(frame);
						ro.disconnect();
					};
				}
				return function () {
					if (frame) window.cancelAnimationFrame(frame);
				};
			}, []);

			function startAnim() {
				setAnimating(true);
				if (animTimer.current) window.clearTimeout(animTimer.current);
				animTimer.current = window.setTimeout(function () { setAnimating(false); }, 360);
			}
			useEffect(function () {
				return function () { if (animTimer.current) window.clearTimeout(animTimer.current); };
			}, []);
			const searchInput = useRef(null);
			const pendingReveal = useRef(null);
			const groupRefs = useRef(null);
			if (!groupRefs.current) groupRefs.current = new Map();
			const rowRefs = useRef(null);
			if (!rowRefs.current) rowRefs.current = new Map();
			const pendingRecent = useRef(null);
			const wide = props.wide !== false;

			useEffect(function () {
				const timer = setInterval(function () { setNow(Date.now()); }, 60000);
				return function () { clearInterval(timer); };
			}, []);

			const patchView = useCallback(function (patch) {
				setView(function (prev) {
					const next = Object.assign({}, prev, patch);
					writeView(next);
					return next;
				});
			}, []);

			/* ---------------- derived ---------------- */
			const byId = (list && list.byId) || {};
			const allIds = (list && list.ids) || [];
			const archivedSet = useMemo(function () { return archivedSetOf(wsSnapshot); }, [wsSnapshot]);
			const pinnedSet = useMemo(function () { return pinnedSetOf(wsSnapshot); }, [wsSnapshot]);
			const items = (wsSnapshot && wsSnapshot.items) || [];
			const currentId = useMemo(function () { return currentSessionId(byId); }, [byId]);

			const groups = useMemo(function () {
				return buildWorkspaceGroups({
					items: items,
					byId: byId,
					allIds: allIds,
					currentId: currentId,
					archivedSet: archivedSet,
					archivedFilter: view.archivedFilter,
					orderBy: view.orderBy,
					pinnedSet: pinnedSet,
					tr: tr
				});
			}, [items, byId, allIds, currentId, archivedSet, view.archivedFilter, view.orderBy, pinnedSet, tr]);

			const orderedGroups = useMemo(function () {
				const order = view.groupOrder;
				if (!Array.isArray(order) || order.length === 0) return groups;
				const rank = new Map();
				for (let i = 0; i < order.length; i++) rank.set(order[i], i);
				const big = 100000;
				return groups.map(function (g, i) { return { g: g, i: i }; }).sort(function (a, b) {
					const ra = rank.has(a.g.id) ? rank.get(a.g.id) : big + a.i;
					const rb = rank.has(b.g.id) ? rank.get(b.g.id) : big + b.i;
					return ra - rb;
				}).map(function (x) { return x.g; });
			}, [groups, view.groupOrder]);

			const cancelGroupHold = useCallback(function () {
				if (groupHold.current) {
					window.clearTimeout(groupHold.current);
					groupHold.current = 0;
				}
			}, []);

			const startGroupHold = useCallback(function (id, event) {
				if (view.groupBy !== 'workspace') return;
				if (event.button !== 0) return;
				if (event.target && event.target.closest && event.target.closest('[data-menu-trigger]')) return;
				cancelGroupHold();
				const startY = event.clientY;
				groupHold.current = window.setTimeout(function () {
					groupHold.current = 0;
					const refs = groupRefs.current;
					let step = 32;
					let rect = { left: 0, top: 0, width: 240 };
					if (refs) {
						const el = refs.get(id);
						if (el) {
							const box = el.getBoundingClientRect();
							rect = { left: box.left, top: box.top, width: box.width };
							const headEl = el.querySelector ? el.querySelector('.sr-ws-row') : null;
							const headH = headEl ? headEl.offsetHeight : 0;
							if (headH > 12) step = headH;
						}
					}
					let scroller = null;
					if (refs && orderedGroups.length > 0) {
						const el0 = refs.get(orderedGroups[0].id);
						scroller = el0 && el0.closest ? el0.closest('.sr-scroll') : null;
					}
					groupDragMeta.current = {
						step: step,
						grabOffset: startY - rect.top,
						rect: rect,
						scroller: scroller
					};
					dragTargetRef.current = -1;
					setGroupDrag({ id: id, clientY: startY, rect: rect });
				}, 320);
			}, [view.groupBy, orderedGroups, cancelGroupHold]);

			const recentIds = useMemo(function () {
				return collectVisible({
					list: list,
					archivedSet: archivedSet,
					archivedFilter: view.archivedFilter,
					orderBy: 'updated',
					pinnedSet: null,
					currentId: currentId
				}).slice(0, MAX_RECENT);
			}, [list, archivedSet, view.archivedFilter, currentId]);

			const flatIds = useMemo(function () {
				return collectVisible({
					list: list,
					archivedSet: archivedSet,
					archivedFilter: view.archivedFilter,
					orderBy: view.orderBy,
					pinnedSet: pinnedSet,
					currentId: currentId
				});
			}, [list, archivedSet, view.archivedFilter, view.orderBy, pinnedSet, currentId]);

			const defaultExpanded = useMemo(function () {
				const set = new Set();
				if (!currentId) return set;
				for (let i = 0; i < groups.length; i++) {
					const group = groups[i];
					if (group.sessions.indexOf(currentId) >= 0) {
						set.add(group.id);
						break;
					}
				}
				return set;
			}, [groups, currentId]);

			const expandedSet = useMemo(function () {
				if (view.expanded === null) return defaultExpanded;
				return new Set(view.expanded);
			}, [view.expanded, defaultExpanded]);

			const currentGroupId = useMemo(function () {
				if (!currentId) return '';
				for (let i = 0; i < groups.length; i++) {
					if (groups[i].sessions.indexOf(currentId) >= 0) return groups[i].id;
				}
				return '';
			}, [groups, currentId]);

			useEffect(function () {
				if (currentGroupId) {
					setFocusWorkspaceId(currentGroupId);
					return;
				}
				for (let i = 0; i < groups.length; i++) {
					if (expandedSet.has(groups[i].id)) {
						setFocusWorkspaceId(groups[i].id);
						return;
					}
				}
			}, [currentGroupId, groups, expandedSet]);

			const collapsedNodes = useMemo(function () {
				return new Set(view.collapsedNodes || []);
			}, [view.collapsedNodes]);

			const currentStatuses = statuses;

			/* ---------------- search ---------------- */
			useEffect(function () {
				const text = query.trim();
				if (!text) {
					setRemote({ query: '', status: 'idle', items: [], hasMore: false });
					return undefined;
				}
				let cancelled = false;
				const controller = typeof AbortController === 'function' ? new AbortController() : null;
				const timer = setTimeout(function () {
					if (cancelled) return;
					setRemote({ query: text, status: 'loading', items: [], hasMore: false });
					let promise = null;
					try {
						promise = props.searchSessions(text, controller ? controller.signal : undefined);
					} catch (err) {
						promise = null;
					}
					Promise.resolve(promise).then(function (result) {
						if (cancelled) return;
						const payload = result && typeof result === 'object' && 'value' in result && 'ok' in result
							? (result.ok ? result.value : null)
							: result;
						if (!payload) {
							setRemote({ query: text, status: 'error', items: [], hasMore: false });
							return;
						}
						setRemote({
							query: text,
							status: 'ready',
							items: Array.isArray(payload.items) ? payload.items : [],
							hasMore: !!payload.hasMore
						});
					}, function () {
						if (!cancelled) setRemote({ query: text, status: 'error', items: [], hasMore: false });
					});
				}, SEARCH_DEBOUNCE);
				return function () {
					cancelled = true;
					clearTimeout(timer);
					if (controller) controller.abort();
				};
			}, [query, props.searchSessions]);

			useEffect(function () {
				if (!searchOpen) return;
				const el = searchInput.current;
				if (el) el.focus();
			}, [searchOpen]);

			const localMatches = useMemo(function () {
				const text = query.trim().toLowerCase();
				if (!text) return [];
				const out = [];
				for (let i = 0; i < allIds.length && out.length < SEARCH_RESULT_LIMIT; i++) {
					const id = allIds[i];
					const session = byId[id];
					if (!baseVisible(session, currentId)) continue;
					const title = sessionTitle(session, tr).toLowerCase();
					if (title.indexOf(text) >= 0) out.push({ sessionId: id, snippet: '' });
				}
				return out;
			}, [query, allIds, byId, currentId, tr]);

			const remoteMatches = useMemo(function () {
				const seen = new Set(localMatches.map(function (item) { return item.sessionId; }));
				const out = [];
				(remote.items || []).forEach(function (item) {
					if (!item || !item.sessionId || seen.has(item.sessionId)) return;
					seen.add(item.sessionId);
					out.push(item);
				});
				return out;
			}, [remote.items, localMatches]);

			/* ---------------- toast helper ---------------- */
			const notify = useCallback(function (next) {
				setToast(next);
			}, []);

			useEffect(function () {
				if (!toast) return undefined;
				const delay = toast.actionLabel ? 9000 : 4500;
				const timer = setTimeout(function () { setToast(null); }, delay);
				return function () { clearTimeout(timer); };
			}, [toast]);

			/* ---------------- actions ---------------- */
			const openSession = useCallback(function (id) {
				if (!id) return;
				if (archivedSet.has(id)) {
					notify({ message: tr('toast.archivedNotOpenable') });
					return;
				}
				try {
					props.openSession(id);
				} catch (err) {
					/* ignore */
				}
			}, [archivedSet, notify, props, tr]);

			const newSession = useCallback(function (workspaceId) {
				try {
					props.startSession(workspaceId, { clearPreviousDraft: false });
				} catch (err) {
					try {
						props.startSession(workspaceId);
					} catch (err2) {
						/* ignore */
					}
				}
			}, [props]);

			const addWorkspace = useCallback(function () {
				let picked = null;
				try {
					picked = props.pickDirectory();
				} catch (err) {
					picked = null;
				}
				Promise.resolve(picked).then(function (path) {
					if (!path) return null;
					return props.createWorkspace(path);
				}).catch(function () {
					notify({ message: tr('toast.createFailed') });
				});
			}, [notify, props, tr]);

			const submitRenameWorkspace = useCallback(function () {
				if (!dialog || dialog.busy) return;
				const value = String(dialog.value || '').trim();
				if (!value) return;
				const duplicate = (items || []).some(function (item) {
					if (item.workspaceId === dialog.id) return false;
					return workspaceName(item) === value;
				});
				if (duplicate) {
					setDialog(Object.assign({}, dialog, { error: tr('conflict.named', { name: value }) }));
					return;
				}
				setDialog(Object.assign({}, dialog, { busy: true, error: null }));
				Promise.resolve(props.renameWorkspace(dialog.id, value)).then(function () {
					setDialog(null);
				}, function () {
					setDialog(function (prev) { return prev ? Object.assign({}, prev, { busy: false }) : prev; });
				});
			}, [dialog, items, props, tr]);

			const submitDeleteWorkspace = useCallback(function () {
				if (!dialog || dialog.busy) return;
				setDialog(Object.assign({}, dialog, { busy: true }));
				Promise.resolve(props.deleteWorkspace(dialog.id)).then(function () {
					setDialog(null);
				}, function () {
					setDialog(function (prev) { return prev ? Object.assign({}, prev, { busy: false }) : prev; });
				});
			}, [dialog, props]);

			const submitRenameSession = useCallback(function () {
				if (!dialog || dialog.busy) return;
				const value = String(dialog.value || '').trim();
				if (!value) return;
				setDialog(Object.assign({}, dialog, { busy: true }));
				Promise.resolve(props.renameSession(dialog.id, value)).then(function () {
					setDialog(null);
				}, function () {
					setDialog(function (prev) { return prev ? Object.assign({}, prev, { busy: false }) : prev; });
				});
			}, [dialog, props]);

			const doArchive = useCallback(function (id, stopActivity) {
				return Promise.resolve(props.archiveSession(id, { stopActivity: !!stopActivity })).then(function () {
					notify({
						message: tr('toast.archived'),
						actionLabel: tr('toast.archivedUndo'),
						onAction: function () {
							Promise.resolve(props.unarchiveSession(id)).catch(function () {});
						},
						altLabel: tr('toast.archivedFilter'),
						onAlt: function () {
							patchView({ archivedFilter: 'only' });
						}
					});
				}, function (reason) {
					const code = reason && (reason.code || (reason.data && reason.data.code));
					if (code === 'workspace/session-active' || (reason && reason.active)) {
						setDialog({ type: 'archive', id: id, value: '', busy: false, error: null, reason: reason });
						return;
					}
					setDialog({ type: 'archive', id: id, value: '', busy: false, error: null, reason: null });
				});
			}, [notify, patchView, props, tr]);

			const requestArchive = useCallback(function (id) {
				const kind = statusKind(statusOf(currentStatuses, id));
				if (kind === 'running' || kind === 'pending' || kind === 'error') {
					setDialog({ type: 'archive', id: id, value: '', busy: false, error: null, reason: null });
					return;
				}
				doArchive(id, false);
			}, [currentStatuses, doArchive]);

			const togglePin = useCallback(function (id, pinned) {
				const fn = pinned ? props.unpinSession : props.pinSession;
				if (typeof fn !== 'function') {
					notify({ message: tr(pinned ? 'toast.unpinFailed' : 'toast.pinFailed') });
					return;
				}
				Promise.resolve(fn(id)).catch(function () {
					notify({ message: tr(pinned ? 'toast.unpinFailed' : 'toast.pinFailed') });
				});
			}, [notify, props, tr]);

			const forkSession = useCallback(function (id) {
				try {
					Promise.resolve(props.forkSession(id)).catch(function () {
						notify({ message: tr('toast.forkRequiresOpen') });
					});
				} catch (err) {
					notify({ message: tr('toast.forkRequiresOpen') });
				}
			}, [notify, props, tr]);

			const copySessionId = useCallback(function (id) {
				let task = null;
				try {
					if (navigator.clipboard && navigator.clipboard.writeText) task = navigator.clipboard.writeText(id);
				} catch (err) {
					task = null;
				}
				Promise.resolve(task).then(function () {
					notify({ message: tr('toast.sessionIdCopied') });
				}, function () {
					notify({ message: tr('toast.sessionIdCopyFailed') });
				});
			}, [notify, tr]);

			const dropSession = useCallback(function (workspaceId, sessionId, beforeSessionId) {
				if (view.orderBy !== 'manual') patchView({ orderBy: 'manual' });
				try {
					Promise.resolve(props.insertSessionBefore(workspaceId, sessionId, beforeSessionId || undefined)).catch(function () {});
				} catch (err) {
					/* ignore */
				}
			}, [props, view.orderBy, patchView]);

			/* ---------------- reveal a session inside the workspace list ---------------- */
			const revealSession = useCallback(function (id) {
				if (!id) return;
				let group = null;
				for (let i = 0; i < groups.length; i++) {
					if (groups[i].sessions.indexOf(id) >= 0) {
						group = groups[i];
						break;
					}
				}
				if (!group) return;
				const next = new Set(expandedSet);
				next.add(group.id);
				const patch = { expanded: Array.from(next) };
				if (view.wsCollapsed) {
					patch.wsCollapsed = false;
					startAnim();
				}
				if (collapsedNodes.size) {
					const owners = [];
					buildTreeGroups(groups).forEach(function (container) {
						const hit = container.children.some(function (child) { return child.id === group.id; });
						if (hit) owners.push(container.key);
					});
					if (owners.length) {
						patch.collapsedNodes = Array.from(collapsedNodes).filter(function (key) {
							return owners.indexOf(key) < 0;
						});
					}
				}
				patchView(patch);
				pendingReveal.current = group.id;
			}, [groups, expandedSet, view.wsCollapsed, collapsedNodes, patchView]);

			function trackDragTarget() {
				if (!groupDrag) return;
				const refs = groupRefs.current;
				const meta = groupDragMeta.current;
				if (!refs || !meta || !meta.scroller || orderedGroups.length === 0) return;
				const scroller = meta.scroller;
				const first = refs.get(orderedGroups[0].id);
				if (!first) return;
				const box = scroller.getBoundingClientRect();
				const contentY = groupDrag.clientY - box.top - (scroller.clientTop || 0) + scroller.scrollTop;
				const step = meta.step > 12 ? meta.step : 32;
				const idx = Math.floor((contentY - first.offsetTop) / step);
				dragTargetRef.current = Math.max(0, Math.min(orderedGroups.length - 1, idx));
			}
			trackDragTarget();
			const commitGroupDrag = useCallback(function () {
				const d = groupDrag;
				if (!d) return;
				const ids = orderedGroups.map(function (g) { return g.id; });
				const from = ids.indexOf(d.id);
				const to = dragTargetRef.current;
				if (from >= 0 && to >= 0 && to < ids.length && to !== from) {
					const next = ids.slice();
					next.splice(from, 1);
					next.splice(to, 0, d.id);
					patchView({ groupOrder: next });
				}
				groupDragMeta.current = null;
				dragTargetRef.current = -1;
				setGroupDrag(null);
			}, [groupDrag, orderedGroups, patchView]);

			useEffect(function () {
				if (!groupDrag) return undefined;
				const meta = groupDragMeta.current;
				if (!meta) return undefined;
				const scroller = meta.scroller;
				let frame = 0;
				let auto = 0;
				let pointerY = groupDrag.clientY;
				function push() {
					if (frame) return;
					frame = window.requestAnimationFrame(function () {
						frame = 0;
						const y = pointerY;
						setGroupDrag(function (cur) { return cur ? { id: cur.id, clientY: y, rect: cur.rect } : cur; });
					});
				}
				function onMove(event) {
					pointerY = event.clientY;
					push();
				}
				function onUp() {
					commitGroupDrag();
				}
				function tick() {
					auto = window.requestAnimationFrame(tick);
					if (!scroller) return;
					const box = scroller.getBoundingClientRect();
					const EDGE = 46;
					const SPEED = 9;
					if (pointerY < box.top + EDGE) {
						if (scroller.scrollTop > 0) scroller.scrollTop -= SPEED;
					} else if (pointerY > box.bottom - EDGE) {
						if (scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1) scroller.scrollTop += SPEED;
					}
				}
				window.addEventListener('pointermove', onMove);
				window.addEventListener('pointerup', onUp);
				window.addEventListener('pointercancel', onUp);
				auto = window.requestAnimationFrame(tick);
				return function () {
					if (frame) window.cancelAnimationFrame(frame);
					if (auto) window.cancelAnimationFrame(auto);
					window.removeEventListener('pointermove', onMove);
					window.removeEventListener('pointerup', onUp);
					window.removeEventListener('pointercancel', onUp);
				};
			}, [groupDrag && groupDrag.id, commitGroupDrag]);

			const revealRecent = useCallback(function (id) {
				if (!id) return;
				pendingRecent.current = id;
				if (view.recentCollapsed) {
					startAnim();
					patchView({ recentCollapsed: false });
				}
			}, [view.recentCollapsed, patchView]);

			/* ---------------- menu items ---------------- */
			const viewMenuItems = useMemo(function () {
				const base = [
					{ type: 'label', id: 'g', text: tr('groupBy.label') },
					{ id: 'workspace', label: tr('groupBy.workspace'), icon: h(Icon, { name: 'folderClose', size: 14 }) },
					{ id: 'workspace-tree', label: tr('groupBy.workspaceTree'), icon: h(Icon, { name: 'tree', size: 14 }) },
					{ id: 'flat', label: tr('groupBy.flat'), icon: h(Icon, { name: 'flat', size: 14 }) },
					{ type: 'separator', id: 's1' },
					{ type: 'label', id: 'o', text: tr('orderBy.label') },
					{ id: 'manual', label: tr('orderBy.manual'), icon: h(Icon, { name: 'sortManual', size: 14 }) },
					{ id: 'updated', label: tr('orderBy.updated'), icon: h(Icon, { name: 'clock', size: 14 }) },
					{ type: 'separator', id: 's2' },
					{ type: 'label', id: 'f', text: tr('filterBy.label') },
					{ id: 'hide-archived', label: tr('viewOptions.hideArchived'), icon: h(Icon, { name: 'archiveOff', size: 14 }) },
					{ id: 'show-archived', label: tr('viewOptions.showArchived'), icon: h(Icon, { name: 'queue', size: 14 }) },
					{ id: 'only-archived', label: tr('viewOptions.onlyArchived'), icon: h(Icon, { name: 'archiveDone', size: 14 }) },
					{ type: 'separator', id: 's3' },
					{
						id: 'toggle-time',
						label: tr('showTime.label'),
						icon: h(Icon, { name: 'clock', size: 14 })
					},
					{
						id: 'toggle-split',
						label: tr('split.label'),
						icon: h(Icon, { name: 'sortManual', size: 14 })
					},
					{
						id: 'toggle-appearance',
						label: tr('appearance.label') + (appearanceOpen ? '  \u25BE' : '  \u25B8'),
						icon: h(Icon, { name: 'sliders', size: 14 })
					}
				];
				if (!appearanceOpen) return base;
				return base.concat([
					{ type: 'label', id: 'fz', text: tr('font.size') },
					{
						type: 'stepper',
						id: 'font-section',
						label: tr('font.section'),
						value: view.fontSection,
						min: FONT_MIN,
						max: FONT_MAX,
						step: FONT_STEP
					},
					{
						type: 'stepper',
						id: 'font-group',
						label: tr('font.group'),
						value: view.fontGroup,
						min: FONT_MIN,
						max: FONT_MAX,
						step: FONT_STEP
					},
					{
						type: 'stepper',
						id: 'font-row',
						label: tr('font.row'),
						value: view.fontRow,
						min: FONT_MIN,
						max: FONT_MAX,
						step: FONT_STEP
					},
					{ type: 'label', id: 'ps', text: tr('panelStyle.label') },
					{ id: 'panel-glass', label: tr('panelStyle.glass'), level: 1 },
					{ id: 'panel-blend', label: tr('panelStyle.blend'), level: 1 },
					{ id: 'panel-contrast', label: tr('panelStyle.contrast'), level: 1 },
					{
						type: 'chips',
						id: 'recent-align',
						label: tr('recentAlign.label'),
						value: view.recentAlign,
						options: [
							{ id: 'global', label: tr('recentAlign.global') },
							{ id: 'independent', label: tr('recentAlign.independent') }
						]
					}
				]);
			}, [tr, appearanceOpen, view.fontSection, view.fontGroup, view.fontRow, view.recentAlign, view.showTime]);

			const viewMenuSelected = useMemo(function () {
				return [
					view.groupBy,
					view.orderBy,
					{ default: 'hide-archived', show: 'show-archived', only: 'only-archived' }[view.archivedFilter],
					'panel-' + view.panelStyle,
					'recent-align-' + view.recentAlign,
					view.showTime ? 'toggle-time' : '',
					view.split ? 'toggle-split' : ''
				];
			}, [view.groupBy, view.orderBy, view.archivedFilter, view.panelStyle, view.recentAlign, view.showTime, view.split]);

			function onViewMenuPick(id) {
				if (id === 'toggle-time') {
					patchView({ showTime: !view.showTime });
					setMenu(null);
					return;
				}
				if (id === 'toggle-split') {
					patchView({ split: !view.split });
					setMenu(null);
					return;
				}
				if (id === 'toggle-appearance') {
					setAppearanceOpen(function (v) { return !v; });
					return;
				}
				if (id.indexOf('recent-align:') === 0) {
					const mode = id.split(':')[1];
					if (mode === 'global' || mode === 'independent') patchView({ recentAlign: mode });
					return;
				}
				if (id.indexOf('font-') === 0) {
					const parts = id.split(':');
					const slot = parts[0].slice(5);
					const num = parseFloat(parts[1]);
					if (!isFinite(num)) return;
					const value = clampFont(num);
					if (slot === 'section') patchView({ fontSection: value });
					else if (slot === 'group') patchView({ fontGroup: value });
					else if (slot === 'row') patchView({ fontRow: value });
					return;
				}
				if (id === 'workspace' || id === 'workspace-tree' || id === 'flat') patchView({ groupBy: id });
				else if (id === 'manual' || id === 'updated') patchView({ orderBy: id });
				else if (id === 'hide-archived') patchView({ archivedFilter: 'default' });
				else if (id === 'show-archived') patchView({ archivedFilter: 'show' });
				else if (id === 'only-archived') patchView({ archivedFilter: 'only' });
				else if (id === 'panel-glass') patchView({ panelStyle: 'glass' });
				else if (id === 'panel-blend') patchView({ panelStyle: 'blend' });
				else if (id === 'panel-contrast') patchView({ panelStyle: 'contrast' });
				setMenu(null);
			}

			const workspaceMenuItems = useMemo(function () {
				if (!menu || menu.kind !== 'workspace') return [];
				const group = menu.group;
				const out = [
					{ id: 'new-session', label: tr('actions.newSession'), icon: h(Icon, { name: 'newChat', size: 14 }) }
				];
				if (group && group.kind === 'workspace') {
					out.push({ type: 'separator', id: 'ws-sep' });
					out.push({ id: 'rename', label: tr('rename'), icon: h(Icon, { name: 'edit', size: 14 }) });
					out.push({ id: 'delete', label: tr('delete.workspace'), icon: h(Icon, { name: 'trash', size: 14 }), danger: true });
				}
				return out;
			}, [menu, tr]);

			function onWorkspaceMenuPick(id) {
				const group = menu && menu.group;
				if (!group) return;
				if (id === 'new-session') newSession(group.kind === 'workspace' ? group.id : undefined);
				else if (id === 'rename') setDialog({ type: 'rename-workspace', id: group.id, value: group.title, busy: false, error: null });
				else if (id === 'delete') setDialog({ type: 'delete-workspace', id: group.id, value: group.title, busy: false, error: null });
				setMenu(null);
			}

			const sessionMenuItems = useMemo(function () {
				if (!menu || menu.kind !== 'session') return null;
				const id = menu.id;
				const archived = archivedSet.has(id);
				const pinned = pinnedSet.has(id);
				const canPin = typeof props.pinSession === 'function' || typeof props.unpinSession === 'function';
				const out = [];
				if (!archived) {
					out.push({ id: 'open', label: tr('menu.openInNew'), icon: h(Icon, { name: 'newChat', size: 14 }) });
					out.push({ id: 'fork', label: tr('menu.fork'), icon: h(Icon, { name: 'branch', size: 14 }) });
					out.push({ type: 'separator', id: 'ss1' });
				}
				out.push({ id: 'rename', label: tr('rename'), icon: h(Icon, { name: 'edit', size: 14 }) });
				if (!archived) {
					out.push({ id: 'archive', label: tr('menu.archiveSession'), icon: h(Icon, { name: 'archive', size: 14 }) });
				} else {
					out.push({ id: 'unarchive', label: tr('menu.unarchiveSession'), icon: h(Icon, { name: 'unarchive', size: 14 }) });
				}
				if (canPin) {
					out.push({ id: 'pin', label: tr(pinned ? 'menu.unpinSession' : 'menu.pinSession'), icon: h(Icon, { name: pinned ? 'pin' : 'pinFill', size: 14 }) });
				}
				out.push({ type: 'separator', id: 'ss2' });
				out.push({ id: 'copy-id', label: tr('menu.sessionId'), icon: h(Icon, { name: 'copy', size: 14 }) });
				return out;
			}, [menu, archivedSet, pinnedSet, props, tr]);

			function onSessionMenuPick(id) {
				const target = menu && menu.id;
				if (!target) return;
				const archived = archivedSet.has(target);
				const pinned = pinnedSet.has(target);
				if (id === 'open') openSession(target);
				else if (id === 'fork') forkSession(target);
				else if (id === 'rename') {
					const node = byId[target];
					setDialog({ type: 'rename-session', id: target, value: node && node.title ? node.title : '', busy: false, error: null });
				} else if (id === 'archive') requestArchive(target);
				else if (id === 'unarchive') {
					Promise.resolve(props.unarchiveSession(target)).catch(function () {});
				} else if (id === 'pin') togglePin(target, pinned);
				else if (id === 'copy-id') copySessionId(target);
				else if (id === 'delete-session') requestArchive(target);
				setMenu(null);
			}

/* ---------------- render helpers ---------------- */
			const styleEl = h('style', { key: 'sr-style' }, CSS_TEXT);

			useEffect(function () {
				const key = pendingReveal.current;
				if (key) {
					pendingReveal.current = null;
					const node = groupRefs.current ? groupRefs.current.get(key) : null;
					if (node && typeof node.scrollIntoView === 'function') {
						window.setTimeout(function () {
							node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
						}, 260);
					}
				}
				const sid = pendingRecent.current;
				if (sid) {
					pendingRecent.current = null;
					const row = rowRefs.current ? rowRefs.current.get(sid) : null;
					if (row && typeof row.scrollIntoView === 'function') {
						window.setTimeout(function () {
							row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
						}, 260);
					}
				}
			});

			function toggleGroup(id) {
				const next = new Set(expandedSet);
				if (next.has(id)) next.delete(id);
				else next.add(id);
				patchView({ expanded: Array.from(next) });
			}

			function toggleNode(key) {
				const next = new Set(collapsedNodes);
				if (next.has(key)) next.delete(key);
				else next.add(key);
				patchView({ collapsedNodes: Array.from(next) });
			}

			function openMenuAt(kind, event, extra) {
				const rect = event && event.currentTarget ? event.currentTarget.getBoundingClientRect() : null;
				const point = event && typeof event.clientX === 'number' ? { x: event.clientX, y: event.clientY } : null;
				const next = Object.assign({ kind: kind, anchor: rect, point: point }, extra || {});
				setMenu(function (current) {
					if (current && current.kind === next.kind) {
						if (kind === 'view') return null;
						if (kind === 'session' && current.id === next.id) return null;
						if (kind === 'workspace' && current.group && next.group && current.group.id === next.group.id) return null;
					}
					return next;
				});
			}

			const STATUS_RANK = { error: 4, pending: 3, running: 2, unread: 1 };

			function groupStatusOf(group) {
				let best = 0;
				let kind = '';
				for (let i = 0; i < group.sessions.length; i++) {
					const k = statusKind(statusOf(currentStatuses, group.sessions[i]));
					const rank = STATUS_RANK[k] || 0;
					if (rank > best) {
						best = rank;
						kind = k;
					}
				}
				return kind;
			}

			function renderSession(id, opts) {
				const node = byId[id];
				const archived = archivedSet.has(id);
				const pinned = pinnedSet.has(id);
				const menuOpen = !!(menu && menu.kind === 'session' && menu.id === id);
				const options = opts || {};
				return h(SessionRow, {
					key: (options.prefix || '') + id,
					id: id,
					node: node,
					tr: tr,
					now: now,
					current: id === currentId,
					archived: archived,
					pinned: pinned,
					status: statusKind(statusOf(currentStatuses, id)),
					side: view.indicatorSide,
					statusRight: options.prefix === 'recent:',
					showTime: !!options.showTime,
					menuOpen: menuOpen,
					draggable: !!options.draggable && !archived && !!options.groupId && options.groupId !== '__flat',
					dragging: !!(drag && drag.id === id),
					dropBefore: !!(dropTarget && dropTarget.id === id && dropTarget.before),
					rowRef: options.prefix === 'recent:' ? function (el) {
						if (!rowRefs.current) return;
						if (el) rowRefs.current.set(id, el);
						else rowRefs.current.delete(id);
					} : undefined,
					onOpen: function () {
						if (options.reveal) revealSession(id);
						else revealRecent(id);
						openSession(id);
					},
					onMore: function (event) {
						event.preventDefault();
						event.stopPropagation();
						openMenuAt('session', event, { id: id });
					},
					onDragStart: function (event) {
						setDrag({ id: id, groupId: options.groupId });
						if (event.dataTransfer) {
							event.dataTransfer.effectAllowed = 'move';
							try {
								event.dataTransfer.setData('text/plain', id);
							} catch (err) { /* ignore */ }
						}
					},
					onDragEnd: function () {
						setDrag(null);
						setDropTarget(null);
					},
					onDragOver: function (event) {
						if (!drag || drag.id === id || !options.groupId || drag.groupId !== options.groupId) return;
						event.preventDefault();
						if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
						const rect = event.currentTarget.getBoundingClientRect();
						const before = event.clientY - rect.top < rect.height / 2;
						setDropTarget({ id: id, groupId: options.groupId, before: before });
					},
					onDragLeave: function () {},
					onDrop: function (event) {
						event.preventDefault();
						if (drag && drag.id !== id && options.groupId && drag.groupId === options.groupId) {
							const target = dropTarget && dropTarget.id === id ? dropTarget : null;
							const beforeId = !target ? id : target.before ? id : options.nextId;
							dropSession(options.groupId, drag.id, beforeId);
						}
						setDrag(null);
						setDropTarget(null);
					}
				});
			}

			function renderGroup(group) {
				const collapsed = groupDrag ? true : !expandedSet.has(group.id);
				const dragFrom = groupDrag ? orderedGroups.findIndex(function (g) { return g.id === groupDrag.id; }) : -1;
				const myIndex = orderedGroups.indexOf(group);
				const isDragging = !!(groupDrag && groupDrag.id === group.id);
				let shiftY = 0;
				if (groupDrag && !isDragging && dragFrom >= 0) {
					const step = groupDragMeta.current && groupDragMeta.current.step ? groupDragMeta.current.step : 35;
					const target = dragTargetRef.current;
					if (target >= 0 && target < orderedGroups.length) {
						if (dragFrom < target && myIndex > dragFrom && myIndex <= target) shiftY = -step;
						else if (dragFrom > target && myIndex >= target && myIndex < dragFrom) shiftY = step;
					}
				}
				const menuOpen = !!(menu && menu.kind === 'workspace' && menu.group && menu.group.id === group.id);
				let inner = null;
				if (group.sessions.length === 0) {
					inner = h('div', { key: 'empty', className: 'sr-group-empty' }, tr('empty.none'));
				} else {
					inner = h('div', { key: 'list', className: 'sr-group-list' }, group.sessions.map(function (id, index) {
						return renderSession(id, {
							prefix: group.id + ':',
							groupId: group.kind === 'workspace' ? group.id : undefined,
							draggable: true,
							nextId: group.sessions[index + 1]
						});
					}));
				}
				const body = h('div', {
					key: 'body',
					className: 'sr-group-body' + (collapsed ? '' : ' is-open'),
					'aria-hidden': collapsed ? 'true' : 'false'
				}, h('div', { key: 'inner', className: 'sr-group-inner' }, inner));
				return h('div', {
					key: group.id,
					ref: function (node) {
						if (!groupRefs.current) return;
						if (node) groupRefs.current.set(group.id, node);
						else groupRefs.current.delete(group.id);
					},
					className: 'sr-group' + (menuOpen ? ' is-menu-open' : '') + (isDragging ? ' is-group-dragging' : '') + (shiftY ? ' is-group-shifting' : ''),
					style: isDragging ? { visibility: 'hidden' } : (shiftY ? { transform: 'translateY(' + shiftY + 'px)' } : undefined),
					onPointerDown: function (event) {
						startGroupHold(group.id, event);
					},
					onPointerUp: cancelGroupHold,
					onPointerCancel: cancelGroupHold
				}, [
					h(WorkspaceRow, {
						key: 'h',
						group: group,
						tr: tr,
						collapsed: collapsed,
						status: collapsed ? groupStatusOf(group) : '',
						onToggle: function () {
						toggleGroup(group.id);
					},
						onMore: function (event) {
							event.preventDefault();
							event.stopPropagation();
							openMenuAt('workspace', event, { group: group });
						},
						onNewSession: function () {
							newSession(group.workspaceId);
						}
					}),
					body
				]);
			}

			function renderContainer(container) {
				const collapsed = container.label ? collapsedNodes.has(container.key) : false;
				const head = container.label ? h('button', {
					key: 'head',
					type: 'button',
					className: 'sr-node-head' + (collapsed ? ' is-collapsed' : ''),
					onClick: function () { toggleNode(container.key); }
				}, [
					h('span', { key: 'l', className: 'sr-node-label' }, container.label)
				]) : null;
				const body = collapsed ? null : h('div', { key: 'body', className: 'sr-node-body' }, container.children.map(renderGroup));
				return h('div', { key: container.key, className: 'sr-node' }, [head, body]);
			}

			function renderSearchRow(item, key) {
				const node = byId[item.sessionId];
				const title = node ? sessionTitle(node, tr) : item.sessionId;
				const archived = archivedSet.has(item.sessionId);
				return h('div', {
					key: key,
					className: 'sr-row is-search' + (item.sessionId === currentId ? ' is-current' : '') + (archived ? ' is-archived' : ''),
					onClick: function () { openSession(item.sessionId); }
				}, [
					h('span', { key: 'l', className: 'sr-row-lead' }, h(Icon, { name: archived ? 'archive' : 'search', size: 12 })),
					h('span', { key: 'b', className: 'sr-row-main' }, [
						h('span', { key: 't', className: 'sr-row-title' }, title),
						item.snippet ? h('span', { key: 's', className: 'sr-row-snippet' }, String(item.snippet).replace(/\s+/g, ' ').slice(0, 120)) : null
					])
				]);
			}

			function renderSearchResults() {
				const text = query.trim();
				if (!text) {
					return h(EmptyState, { key: 'idle', icon: 'search', text: tr('empty.noMatches') });
				}
				if (remote.status === 'loading' && localMatches.length === 0) {
					return h('div', { key: 'pending', className: 'sr-pending' }, tr('search.pending'));
				}
				const rows = [];
				if (localMatches.length) {
					rows.push(h('div', { key: 'h1', className: 'sr-results-label' }, tr('search.local')));
					localMatches.forEach(function (item) {
						rows.push(renderSearchRow(item, 'local:' + item.sessionId));
					});
				}
				if (remoteMatches.length) {
					rows.push(h('div', { key: 'h2', className: 'sr-results-label' }, tr('search.history')));
					remoteMatches.forEach(function (item) {
						rows.push(renderSearchRow(item, 'remote:' + item.sessionId));
					});
				}
				if (remote.hasMore) {
					rows.push(h('div', { key: 'more', className: 'sr-results-note' }, tr('search.hasMore', { n: SEARCH_RESULT_LIMIT })));
				}
				if (!rows.length) {
					return h(EmptyState, { key: 'none', icon: 'search', text: tr('empty.noMatches') });
				}
				return h('div', { key: 'rows', className: 'sr-scroll sr-results' }, rows);
			}

			/* ---------------- header ---------------- */
			const header = h('div', { key: 'head', className: 'sr-head' }, searchOpen ? [
				h('div', { key: 'search', className: 'sr-search' }, [
					h(Icon, { key: 'i', name: 'search', size: 12, className: 'sr-search-icon' }),
					h('input', {
						key: 'in',
						ref: searchInput,
						className: 'sr-search-input',
						type: 'text',
						value: query,
						placeholder: tr('search.placeholder'),
						'aria-label': tr('search.aria'),
						onChange: function (event) { setQuery(event.target.value); },
						onKeyDown: function (event) {
							if (event.key === 'Escape') {
								setQuery('');
								setSearchOpen(false);
							}
						}
					}),
					h('button', {
						key: 'clear',
						type: 'button',
						className: 'sr-icon-btn sr-search-clear',
						title: tr('search.clear'),
						onClick: function () {
							setQuery('');
							setSearchOpen(false);
						}
					}, h(Icon, { name: 'closeFill', size: 12 }))
				])
			] : [
				h('button', {
					key: 'sb',
					type: 'button',
					className: 'sr-icon-btn',
					title: tr('search.aria'),
					'aria-label': tr('search.aria'),
					onClick: function () { setSearchOpen(true); }
				}, h(Icon, { name: 'search', size: 14 })),
				h('span', { key: 'spring', className: 'sr-spring' }),
				h('button', {
					key: 'view',
					type: 'button',
					className: 'sr-icon-btn' + (menu && menu.kind === 'view' ? ' is-active' : ''),
					'data-menu-trigger': '1',
					title: tr('viewOptions.label'),
					'aria-label': tr('viewOptions.label'),
					onClick: function (event) {
						if (menu && menu.kind === 'view') setMenu(null);
						else openMenuAt('view', event, {});
					}
				}, h(Icon, { name: 'sliders', size: 15 })),
				h('button', {
					key: 'add',
					type: 'button',
					className: 'sr-icon-btn',
					title: tr('workspace.add'),
					'aria-label': tr('workspace.add'),
					onClick: addWorkspace
				}, h(Icon, { name: 'projectAdd', size: 15 }))
			]);

			/* ---------------- workspace section ---------------- */
			let workspaceBody = null;
			if (view.groupBy === 'flat') {
				if (flatIds.length === 0) {
					workspaceBody = h(EmptyState, {
						key: 'empty',
						icon: view.archivedFilter === 'only' ? 'archiveDone' : 'queue',
						text: view.archivedFilter === 'only' ? tr('empty.noneArchived') : tr('empty.none'),
						action: view.archivedFilter === 'only' ? {
							label: tr('empty.viewOthers'),
							onClick: function () { patchView({ archivedFilter: 'default' }); }
						} : null
					});
				} else {
					workspaceBody = h('div', { key: 'flat', className: 'sr-scroll', onScroll: updateScrollFades }, flatIds.map(function (id, index) {
						return renderSession(id, { prefix: 'flat:', groupId: '__flat', draggable: true, nextId: flatIds[index + 1] });
					}));
				}
			} else {
				if (groups.length === 0) {
					workspaceBody = h(EmptyState, {
						key: 'empty',
						icon: 'folderOpen',
						text: tr('group.emptyTitle'),
						action: { label: tr('workspace.add'), onClick: addWorkspace }
					});
				} else {
					const nodes = view.groupBy === 'workspace-tree'
						? buildTreeGroups(groups).map(renderContainer)
						: orderedGroups.map(renderGroup);
					workspaceBody = h('div', { key: 'groups', className: 'sr-scroll', onScroll: updateScrollFades }, nodes);
				}
			}

			const WS_HEAD_H = 34;
			const wsRatio = resizeLive && typeof resizeLive.ws === 'number'
				? resizeLive.ws
				: (typeof view.wsRatio === 'number' ? view.wsRatio : null);
			const wsPx = (!resizeLive || typeof resizeLive.ws !== 'number') && typeof view.wsPx === 'number' && view.wsPx > 0
				? view.wsPx
				: null;
			let wsSectionStyle = null;
			if (!view.split) {
				wsSectionStyle = null;
			} else if (view.wsCollapsed) {
				wsSectionStyle = { flex: '0 0 ' + WS_HEAD_H + 'px' };
			} else if (wsPx !== null) {
				wsSectionStyle = { flex: '0 0 ' + wsPx + 'px', maxHeight: 'none' };
			} else if (wsRatio !== null) {
				wsSectionStyle = { flex: '0 0 calc((100% - 10px) * ' + wsRatio + ')', maxHeight: 'none' };
			} else if (wsContentH > 0) {
				wsSectionStyle = { flex: '0 0 ' + Math.max(WS_HEAD_H + 8, wsContentH + WS_HEAD_H) + 'px' };
			}

			const workspaceSection = h('div', { key: 'ws', className: 'sr-section sr-section-ws' + (view.wsCollapsed ? ' is-collapsed' : ''), style: wsSectionStyle }, [
				h(SectionHeader, {
					key: 'h',
					label: view.groupBy === 'flat' ? tr('section.sessions') : tr('section.workspaces'),
					count: view.groupBy === 'flat' ? flatIds.length : groups.length,
					collapsed: view.wsCollapsed,
					onToggle: function () { startAnim(); patchView({ wsCollapsed: !view.wsCollapsed, expanded: view.wsCollapsed ? view.expanded : [] }); },
					tr: tr
				}),
				h('div', {
					key: 'body',
					className: 'sr-section-body' + (view.wsCollapsed ? '' : ' is-open'),
					'aria-hidden': view.wsCollapsed ? 'true' : 'false'
				}, h('div', { key: 'inner', ref: wsInnerRef, className: 'sr-section-inner' }, workspaceBody))
			]);

			/* ---------------- recent section ---------------- */
			let recentBody = null;
			if (recentIds.length === 0) {
				recentBody = h(EmptyState, { key: 'empty', icon: 'clock', text: tr('empty.none') });
			} else {
				recentBody = h('div', { key: 'list', className: 'sr-scroll', onScroll: updateScrollFades }, recentIds.map(function (id) {
					return renderSession(id, { prefix: 'recent:', showTime: view.showTime, reveal: true });
				}));
			}

			const recentSection = h('div', { key: 'recent', className: 'sr-section sr-section-recent' + (view.recentCollapsed ? ' is-collapsed' : '') }, [
				h(SectionHeader, {
					key: 'h',
					label: tr('section.recent'),
					count: recentIds.length,
					collapsed: view.recentCollapsed,
					onToggle: function () { startAnim(); patchView({ recentCollapsed: !view.recentCollapsed }); },
					tr: tr
				}),
				h('div', {
					key: 'body',
					className: 'sr-section-body' + (view.recentCollapsed ? '' : ' is-open'),
					'aria-hidden': view.recentCollapsed ? 'true' : 'false'
				}, h('div', { key: 'inner', className: 'sr-section-inner' }, recentBody))
			]);

			/* ---------------- rail ---------------- */
			if (!wide) {
				const railItems = recentIds.slice(0, RAIL_ITEMS);
				return h('div', {
					key: 'root',
					className: 'sr-root is-rail',
					style: {
						'--sr-fs-section': view.fontSection + 'px',
						'--sr-fs-group': view.fontGroup + 'px',
						'--sr-fs-row': view.fontRow + 'px'
					},
					'data-panel': view.panelStyle
				}, [
					styleEl,
					h('div', { key: 'acts', className: 'sr-rail-actions' }, [
						h(IconButton, {
							key: 's',
							icon: 'search',
							size: 16,
							title: tr('search.aria'),
							onClick: function () {
								if (props.expandSidebar) props.expandSidebar();
							}
						}),
						h(IconButton, {
							key: 'a',
							icon: 'projectAdd',
							size: 16,
							title: tr('workspace.add'),
							onClick: addWorkspace
						})
					]),
					h('div', { key: 'list', className: 'sr-rail-list' }, railItems.map(function (id) {
						const node = byId[id];
						const title = sessionTitle(node, tr);
						return h('button', {
							key: id,
							type: 'button',
							className: 'sr-rail-btn' + (id === currentId ? ' is-current' : '') + (archivedSet.has(id) ? ' is-archived' : ''),
							title: title,
							onClick: function () { openSession(id); }
						}, title.slice(0, 1).toUpperCase());
					})),
					railItems.length === 0 ? h('div', { key: 'none', className: 'sr-rail-empty' }, '·') : null
				]);
			}

			/* ---------------- dialogs ---------------- */
			let dialogEl = null;
			if (dialog && dialog.type === 'rename-workspace') {
				dialogEl = h(Dialog, {
					key: 'rw',
					open: true,
					title: tr('rename.workspace.title'),
					onClose: function () { setDialog(null); },
					footer: [
						{ label: tr('action.cancel'), ghost: true, onClick: function () { setDialog(null); } },
						{ label: tr('action.save'), primary: true, disabled: dialog.busy, onClick: submitRenameWorkspace }
					]
				}, [
					h('label', { key: 'l', className: 'sr-field-label' }, tr('field.workspaceName')),
					h(TextField, {
						key: 'f',
						open: true,
						value: dialog.value,
						disabled: dialog.busy,
						placeholder: tr('field.workspaceName'),
						onChange: function (value) { setDialog(function (prev) { return Object.assign({}, prev, { value: value, error: null }); }); },
						onSubmit: submitRenameWorkspace
					}),
					dialog.error ? h('div', { key: 'e', className: 'sr-error' }, dialog.error) : null
				]);
			} else if (dialog && dialog.type === 'rename-session') {
				dialogEl = h(Dialog, {
					key: 'rs',
					open: true,
					title: tr('rename.session.title'),
					onClose: function () { setDialog(null); },
					footer: [
						{ label: tr('action.cancel'), ghost: true, onClick: function () { setDialog(null); } },
						{ label: tr('action.save'), primary: true, disabled: dialog.busy, onClick: submitRenameSession }
					]
				}, [
					h('label', { key: 'l', className: 'sr-field-label' }, tr('field.sessionName')),
					h(TextField, {
						key: 'f',
						open: true,
						value: dialog.value,
						disabled: dialog.busy,
						placeholder: tr('field.sessionName'),
						onChange: function (value) { setDialog(function (prev) { return Object.assign({}, prev, { value: value }); }); },
						onSubmit: submitRenameSession
					})
				]);
			} else if (dialog && dialog.type === 'delete-workspace') {
				dialogEl = h(Dialog, {
					key: 'dw',
					open: true,
					title: tr('delete.workspace'),
					description: tr('delete.desc', { name: dialog.value }),
					onClose: function () { if (!dialog.busy) setDialog(null); },
					footer: [
						{ label: tr('action.cancel'), ghost: true, disabled: dialog.busy, onClick: function () { setDialog(null); } },
						{ label: dialog.busy ? tr('delete.pending') : tr('delete.workspace'), danger: true, disabled: dialog.busy, onClick: submitDeleteWorkspace }
					]
				});
			} else if (dialog && dialog.type === 'archive') {
				dialogEl = h(Dialog, {
					key: 'ar',
					open: true,
					title: tr('archive.confirm.title'),
					description: tr('archive.confirm.desc'),
					onClose: function () { if (!dialog.busy) setDialog(null); },
					footer: [
						{ label: tr('action.cancel'), ghost: true, disabled: dialog.busy, onClick: function () { setDialog(null); } },
						{
							label: dialog.busy ? tr('archive.confirm.pending') : tr('archive.confirm.action'),
							primary: true,
							disabled: dialog.busy,
							onClick: function () {
								const id = dialog.id;
								setDialog(Object.assign({}, dialog, { busy: true }));
								doArchive(id, true).then(function () { setDialog(null); }, function () { setDialog(null); });
							}
						}
					]
				});
			}

			/* ---------------- resize ---------------- */
			const wsDragging = !!(resizeLive && typeof resizeLive.ws === 'number');

			function startResize() {
				return function (event) {
					if (event.button !== undefined && event.button !== 0) return;
					event.preventDefault();
					const bodyEl = event.currentTarget.closest('.sr-body');
					if (!bodyEl) return;
					const wsEl = bodyEl.querySelector('.sr-section-ws');
					const recentEl = bodyEl.querySelector('.sr-section-recent');
					if (!wsEl || !recentEl) return;
					const rootEl = bodyEl.closest('.sr-root');
					const startWsH = wsEl.getBoundingClientRect().height;
					const startRecentH = recentEl.getBoundingClientRect().height;
					const pairH = startWsH + startRecentH;
					if (pairH <= 120) return;
					const MIN_H = 34;
					const startY = event.clientY;
					let wsH = startWsH;
					let lastY = startY;
					let rafId = 0;
					if (rootEl) {
						rootEl.style.setProperty('--sr-drag-ws', startWsH + 'px');
						rootEl.classList.add('is-resizing');
					}
					document.body.style.userSelect = 'none';
					const paint = function () {
						rafId = 0;
						let next = startWsH + (lastY - startY);
						if (next < MIN_H) next = MIN_H;
						if (next > pairH - MIN_H) next = pairH - MIN_H;
						if (Math.abs(next - wsH) < 0.5) return;
						wsH = next;
						if (rootEl) {
							rootEl.style.setProperty('--sr-drag-ws', next + 'px');
						}
					};
					const onMove = function (moveEvent) {
						lastY = moveEvent.clientY;
						if (rafId) return;
						rafId = window.requestAnimationFrame(paint);
					};
					const finish = function () {
						document.removeEventListener('pointermove', onMove);
						document.removeEventListener('mousemove', onMove);
						document.removeEventListener('pointerup', finish);
						document.removeEventListener('mouseup', finish);
						if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0; }
						document.body.style.cursor = '';
						document.body.style.userSelect = '';
						patchView({ wsRatio: Math.round((wsH / pairH) * 1000) / 1000, wsPx: Math.round(wsH), recentRatio: null });
						var unlock = function () {
							if (!rootEl) return;
							rootEl.classList.remove('is-resizing');
							rootEl.style.removeProperty('--sr-drag-ws');
						};
						if (typeof window.requestAnimationFrame === 'function') {
							window.setTimeout(unlock, 60);
						} else {
							window.setTimeout(unlock, 32);
						}
					};
					document.addEventListener('pointermove', onMove);
					document.addEventListener('mousemove', onMove);
					document.addEventListener('pointerup', finish);
					document.addEventListener('mouseup', finish);
				};
			}

			function resizeHandle() {
				return h('div', {
					key: 'resize',
					className: 'sr-resize' + (wsDragging ? ' is-dragging' : ''),
					role: 'separator',
					'aria-orientation': 'horizontal',
					title: tr('split.hint'),
					onPointerDown: startResize(),
					onDoubleClick: function () {
						patchView({ wsRatio: null, wsPx: null, recentRatio: null });
					}
				}, h('span', { key: 'g', className: 'sr-resize-grip', 'aria-hidden': 'true' }));
			}

			let ghostTitle = '';
			if (groupDrag) {
				const gh = orderedGroups.find(function (x) { return x.id === groupDrag.id; });
				if (gh) ghostTitle = gh.title;
			}
			const dragGhost = groupDrag ? h('div', {
				key: 'ghost',
				className: 'sr-drag-ghost',
				style: {
					left: groupDrag.rect.left + 'px',
					top: (groupDrag.clientY - (groupDragMeta.current ? groupDragMeta.current.grabOffset : 0)) + 'px',
					width: groupDrag.rect.width + 'px'
				}
			}, [
				h(Icon, { key: 'i', name: 'folderClose', size: 14, className: 'sr-ws-icon' }),
				h('span', { key: 't', className: 'sr-ws-title' }, ghostTitle)
			]) : null;
			return h('div', {
				key: 'root',
				className: 'sr-root' + (animating ? ' is-animating' : '') + (view.recentAlign === 'independent' ? ' is-recent-independent' : '') + (view.split ? '' : ' is-global-scroll'),
				style: {
					'--sr-fs-section': view.fontSection + 'px',
					'--sr-fs-group': view.fontGroup + 'px',
					'--sr-fs-row': view.fontRow + 'px'
				},
				'data-panel': view.panelStyle
			}, [
				styleEl,
				h('div', { key: 'glass', className: 'sr-glass', 'aria-hidden': 'true' }),
				header,
				h('div', {
					key: 'body',
					className: 'sr-body'
						+ (view.wsCollapsed ? ' is-ws-collapsed' : '')
						+ (view.recentCollapsed ? ' is-recent-collapsed' : '')
				}, query.trim() ? renderSearchResults() : [
					workspaceSection,
					view.split ? resizeHandle() : null,
					recentSection
				]),
				dragGhost,
				h(Menu, {
					key: 'm-view',
					open: !!(menu && menu.kind === 'view'),
					anchor: menu && menu.anchor,
					point: menu && menu.point,
					align: 'end',
					items: viewMenuItems,
					selectedIds: viewMenuSelected,
					onSelect: onViewMenuPick,
					onClose: function () { setMenu(null); }
				}),
				h(Menu, {
					key: 'm-ws',
					open: !!(menu && menu.kind === 'workspace'),
					anchor: menu && menu.anchor,
					point: menu && menu.point,
					align: 'end',
					items: workspaceMenuItems,
					selectedIds: [],
					onSelect: onWorkspaceMenuPick,
					onClose: function () { setMenu(null); }
				}),
				h(Menu, {
					key: 'm-session',
					open: !!(menu && menu.kind === 'session'),
					anchor: menu && menu.anchor,
					point: menu && menu.point,
					align: 'end',
					items: sessionMenuItems || [],
					selectedIds: [],
					onSelect: onSessionMenuPick,
					onClose: function () { setMenu(null); }
				}),
				dialogEl,
				h(ToastView, {
					key: 'toast',
					toast: toast,
					tr: tr,
					onClose: function () { setToast(null); }
				})
			]);
		}

/* ------------------------------------------------------------------ *
		 * Styles — theme tokens only, with a neutral fallback for each one.
		 * ------------------------------------------------------------------ */
		const GLOBAL_FONT_CSS = [
			':root{--dsw-font-family:"Segoe UI Variable Text","Segoe UI Variable","Noto Sans SC","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif}',
			'html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:geometricPrecision;font-synthesis-weight:none;font-kerning:normal;font-optical-sizing:auto}',
			'body{letter-spacing:normal;font-kerning:normal;font-variant-ligatures:common-ligatures}'
		].join('\n');

		const CSS_TEXT = [
			'.sr-root{--sr-fs-section:11.5px;--sr-fs-group:12.6px;--sr-fs-row:12.5px;position:relative;display:flex;flex-direction:column;flex:1;min-height:0;width:100%;box-sizing:border-box;padding:0 4px 6px;overflow:hidden;color:var(--dsw-alias-label-primary);font-size:var(--sr-fs-row);font-synthesis-weight:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:geometricPrecision;letter-spacing:normal}',
			'.sr-glass{position:absolute;inset:0;pointer-events:none;border-radius:10px;background:linear-gradient(180deg,color-mix(in srgb,var(--dsw-alias-bg-layer-1,#fff) 34%,transparent),color-mix(in srgb,var(--dsw-alias-bg-base,#fff) 18%,transparent));backdrop-filter:blur(18px) saturate(150%);-webkit-backdrop-filter:blur(18px) saturate(150%)}',
			'.sr-head{position:relative;display:flex;align-items:center;gap:2px;height:34px;flex:none;padding:0 2px}',
			'.sr-spring{flex:1 1 auto}',
			'.sr-head-actions{display:inline-flex;align-items:center;gap:2px;flex:none}',
			'.sr-icon-btn{width:26px;height:26px;flex:none;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary,rgba(0,0,0,.6));cursor:pointer;padding:0;transition:background .12s ease,color .12s ease}',
			'.sr-icon-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14));color:var(--dsw-alias-label-primary,#111)}',
			'.sr-icon-btn.is-active{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14));color:var(--dsw-alias-label-primary,#111)}',
			'.sr-search{display:flex;align-items:center;gap:4px;flex:1 1 auto;height:26px;padding:0 6px;border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f2f2f2) 72%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.1)) 80%,transparent)}',
			'.sr-search-icon{flex:none;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.4))}',
			'.sr-search-input{flex:1 1 auto;min-width:0;border:none;background:transparent;outline:none;font-size:var(--sr-fs-row);color:var(--dsw-alias-label-primary,#111);font-family:inherit}',
			'.sr-search-input::placeholder{color:var(--dsw-alias-label-primary,#111)}',
			'.sr-search-clear{width:20px;height:20px;border-radius:5px}',
			'.sr-body{position:relative;flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:1px;padding-top:2px}',
			'.sr-section{display:flex;flex-direction:column;min-height:0;border-radius:10px;overflow:hidden;transition:height .3s cubic-bezier(.4,0,.2,1),flex-grow .3s cubic-bezier(.4,0,.2,1),flex-basis .3s cubic-bezier(.4,0,.2,1),min-height .3s cubic-bezier(.4,0,.2,1);background:rgba(127,127,127,.055);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f4f4f5) 46%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.08)) 66%,transparent);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%)}',
			'.sr-section-ws{flex:0 0 auto;max-height:62%;min-height:0;overflow:hidden}',
			'.sr-section-recent{flex:1 1 0;min-height:34px;overflow:hidden}',
			'.sr-section-recent.is-collapsed{flex:0 0 34px;min-height:34px}',
			
			'.sr-section-body{flex:1 1 auto;display:flex;flex-direction:column;min-height:0;overflow:hidden}',
			'.sr-section-inner{flex:1 1 auto;min-height:0;overflow:hidden;display:flex;flex-direction:column}',
			'.sr-root.is-animating .sr-scroll{-webkit-mask-image:none;mask-image:none}',
			'.sr-root.is-animating .sr-section{will-change:height}',
			'.sr-resize{position:relative;flex:none;height:8px;margin:0 4px -4px;display:flex;align-items:center;justify-content:center;cursor:default;border-radius:6px;touch-action:none;user-select:none;opacity:0;transition:opacity .18s ease,height .3s cubic-bezier(.4,0,.2,1),margin .3s cubic-bezier(.4,0,.2,1)}',
			'.sr-body.is-ws-collapsed .sr-resize,.sr-body.is-recent-collapsed .sr-resize{opacity:0;pointer-events:none}',
			'.sr-resize::before{content:"";position:absolute;left:0;right:0;top:-3px;bottom:-3px}',
			'.sr-resize:hover,.sr-resize.is-dragging{opacity:1}',
			'.sr-resize:hover{background:color-mix(in srgb,var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14)) 75%,transparent)}',
			'.sr-resize-grip{width:40px;height:3px;border-radius:2px;background:var(--dsw-alias-border-l2,rgba(0,0,0,.18));transition:background .12s ease,width .12s ease}',
			'.sr-resize:hover .sr-resize-grip{width:44px;background:rgba(0,0,0,.30);background:color-mix(in srgb,var(--dsw-alias-label-primary,#111) 30%,transparent)}',
			'.sr-root.is-resizing .sr-resize-grip{width:46px;background:rgba(0,0,0,.52);background:color-mix(in srgb,var(--dsw-alias-label-primary,#111) 52%,transparent)}',
			'.sr-root[data-panel="blend"] .sr-glass{opacity:0}',
			'.sr-root[data-panel="blend"] .sr-section{background:transparent;border-color:transparent;box-shadow:none;border-radius:6px;backdrop-filter:none;-webkit-backdrop-filter:none}',
			'.sr-root[data-panel="contrast"] .sr-glass{background:linear-gradient(180deg,color-mix(in srgb,var(--dsw-alias-bg-layer-1,#fff) 52%,transparent),color-mix(in srgb,var(--dsw-alias-bg-base,#fff) 28%,transparent))}',
			'.sr-root[data-panel="contrast"] .sr-section{background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,#fff) 86%,transparent);border-color:var(--dsw-alias-border-l2,rgba(0,0,0,.16));box-shadow:0 1px 3px rgba(0,0,0,.07),inset 0 1px 0 rgba(255,255,255,.4)}',
			'.sr-chev{flex:none;align-self:center;position:relative;top:1px;opacity:0;color:var(--dsw-alias-label-secondary,#5c5c61);transform:rotate(0deg);transition:opacity .16s ease,transform .24s cubic-bezier(.4,0,.2,1)}',
			'.sr-section-header:hover .sr-chev{opacity:1}',
			'.sr-chev.is-open{transform:rotate(90deg)}',
			'.sr-section-header{display:flex;align-items:center;gap:4px;height:34px;flex:none;padding:0 6px 0 11px;cursor:pointer}',
			'.sr-section-label{font-size:var(--sr-fs-section);font-weight:500;letter-spacing:.02em;color:var(--dsw-alias-label-secondary,#5c5c61);white-space:nowrap}',
			'.sr-count{display:inline-flex;align-items:center;height:16px;padding:0 6px;border-radius:999px;font-size:calc(var(--sr-fs-section) * .86);line-height:16px;color:var(--dsw-alias-label-primary,#111);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,#fff) 40%,transparent);white-space:nowrap}',
			'.sr-collapse{width:18px;height:18px;flex:none;display:inline-flex;align-items:center;justify-content:center;border:none;background:transparent;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.4));cursor:pointer;padding:0;border-radius:4px}',
			'.sr-collapse:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
			'.sr-collapse svg{transform:rotate(90deg);transition:transform .16s ease}',
			'.sr-collapse.is-collapsed svg{transform:rotate(0deg)}',
			'.sr-scroll{flex:1 1 0;min-height:0;overflow-y:auto;overflow-x:hidden;--sr-fade-top:0px;--sr-fade-bottom:0px;-webkit-mask-origin:padding-box;mask-origin:padding-box;padding:0 8px 4px 9px;border-top:6px solid transparent;scrollbar-gutter:stable;-webkit-mask-image:linear-gradient(to bottom,transparent 0,rgba(0,0,0,.30) calc(var(--sr-fade-top) * .4),rgba(0,0,0,.78) calc(var(--sr-fade-top) * .7),#000 var(--sr-fade-top),#000 calc(100% - var(--sr-fade-bottom)),rgba(0,0,0,.78) calc(100% - var(--sr-fade-bottom) * .7),rgba(0,0,0,.30) calc(100% - var(--sr-fade-bottom) * .4),transparent 100%);mask-image:linear-gradient(to bottom,transparent 0,rgba(0,0,0,.30) calc(var(--sr-fade-top) * .4),rgba(0,0,0,.78) calc(var(--sr-fade-top) * .7),#000 var(--sr-fade-top),#000 calc(100% - var(--sr-fade-bottom)),rgba(0,0,0,.78) calc(100% - var(--sr-fade-bottom) * .7),rgba(0,0,0,.30) calc(100% - var(--sr-fade-bottom) * .4),transparent 100%)}',
			'.sr-section-ws .sr-scroll{flex:0 1 auto}',
			'.sr-section-inner .sr-scroll{flex:1 1 auto;min-height:0}',
			'.sr-section-recent .sr-scroll{display:flex;flex-direction:column;gap:5px}',
			'.sr-root.is-recent-independent .sr-section-recent .sr-row{padding-left:10px}',
			'.sr-root.is-recent-independent .sr-section-recent .sr-row-lead:empty{display:none}',
			'.sr-scroll::-webkit-scrollbar{width:5px}',
			'.sr-scroll::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--dsw-alias-label-tertiary,rgba(0,0,0,.3)) 42%,transparent);border-radius:3px}',
			'.sr-scroll::-webkit-scrollbar-track{background:transparent}',
			'.sr-row{position:relative;display:flex;flex:0 0 auto;align-items:center;gap:6px;height:32px;padding:0 7px 0 5px;border-radius:10px;cursor:pointer;user-select:none;font-size:var(--sr-fs-row);color:var(--dsw-alias-label-primary,#111);transition:background .16s ease,box-shadow .16s ease,border-radius .16s ease}',
			'.sr-row:hover{background:rgba(0,0,0,.04);background:color-mix(in srgb,var(--dsw-alias-label-primary,#111) 5%,transparent);box-shadow:0 1px 2px rgba(0,0,0,.05)}',
			'.sr-row.is-current{background:rgba(0,0,0,.04);background:color-mix(in srgb,var(--dsw-alias-label-primary,#111) 5%,transparent);box-shadow:0 1px 2px rgba(0,0,0,.05)}',
			
			'.sr-row.is-archived{opacity:.5}',
			'.sr-row.is-dragging{opacity:.35}',
			'.sr-row.is-drop-before::after{content:"";position:absolute;left:4px;right:4px;top:-1px;height:2px;border-radius:2px;background:var(--dsw-alias-brand-primary,#4d6bfe)}',
			'.sr-row-lead{display:inline-flex;align-items:center;justify-content:center;gap:3px;width:13px;flex:none;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.4))}',
			'.sr-row-lead.is-right{width:12px;flex:0 0 12px;margin-left:6px;justify-content:center}',
			'.sr-row-title{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:clip;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent)}',
			'.sr-row-title-in{display:inline-block;white-space:nowrap;transition:transform .22s cubic-bezier(.4,0,.2,1)}',
			'.sr-row-title.is-scrolling{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 14px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 14px),transparent 100%)}',
			'@keyframes sr-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(var(--sr-shift,-40px),0,0)}}',
			'.sr-row-title-in.is-marquee{animation:sr-marquee var(--sr-dur,2.4s) cubic-bezier(.25,.1,.25,1) forwards}',
			'.sr-row-time{flex:none;font-size:calc(var(--sr-fs-row) * .84);color:var(--dsw-alias-label-primary,#111)}',
			'.sr-row-badge{flex:none;font-size:calc(var(--sr-fs-row) * .8);padding:0 4px;height:15px;line-height:15px;border-radius:4px;color:var(--dsw-alias-label-primary,#111);border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.1)) 80%,transparent)}',
			'.sr-row-more{flex:none;display:inline-flex;opacity:0;transition:opacity .1s ease}',
			'.sr-row:hover .sr-row-more,.sr-row.is-menu-open .sr-row-more,.sr-row:focus-within .sr-row-more{opacity:1}',
			'.sr-row-more .sr-icon-btn{width:20px;height:20px}',
			'.sr-pin{color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.4))}',
			'.sr-dot{display:inline-flex;align-items:center;justify-content:center;width:8px;height:8px;flex:0 0 8px;line-height:0}',
			'.sr-dot-svg{display:block;flex:none}',
			'.sr-status{width:12px;height:12px;flex:none;box-sizing:border-box;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;line-height:1;letter-spacing:0;font-family:inherit}',
			'.sr-status.is-running{border:none;background:conic-gradient(from 0deg,rgba(77,107,254,.08) 0deg,rgba(77,107,254,.35) 140deg,rgba(77,107,254,.95) 320deg,var(--dsw-alias-brand-primary,#4d6bfe) 360deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 1.9px),#000 calc(100% - 1.8px));mask:radial-gradient(farthest-side,transparent calc(100% - 1.9px),#000 calc(100% - 1.8px));animation:sr-spin .9s linear infinite}',
			'.sr-status.is-pending{border:1.4px solid var(--dsw-alias-state-warn-primary,#d38b1a);color:var(--dsw-alias-state-warn-primary,#d38b1a)}',
			'.sr-status.is-pending::after{content:"?"}',
			'.sr-status.is-error{border:1.4px solid var(--dsw-alias-state-error-primary,#d13438);color:var(--dsw-alias-state-error-primary,#d13438)}',
			'.sr-status.is-error::after{content:"!"}',
			'@keyframes sr-spin{to{transform:rotate(360deg)}}',
			'.sr-row.is-search{height:auto;min-height:34px;padding-top:5px;padding-bottom:5px;align-items:flex-start}',
			'.sr-row-main{display:flex;flex-direction:column;gap:1px;flex:1 1 auto;min-width:0}',
			'.sr-row-snippet{font-size:10.5px;color:var(--dsw-alias-label-primary,#111);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.sr-group{margin-bottom:0;position:relative;transition:transform .22s cubic-bezier(.4,0,.2,1)}',
			'.sr-group.is-group-shifting{transition:transform .22s cubic-bezier(.4,0,.2,1)}',
			'.sr-group.is-group-dragging{transition:none;z-index:6}',
			'.sr-scroll{position:relative}',
			'.sr-drag-ghost{position:fixed;z-index:999;pointer-events:none;box-sizing:border-box;display:flex;align-items:center;gap:7px;height:32px;padding:0 7px 0 5px;border-radius:10px;background:var(--dsw-alias-bg-layer-1,#fff);box-shadow:0 12px 28px rgba(0,0,0,.20),0 0 0 1px rgba(0,0,0,.06);transform:scale(1.02);will-change:transform}',
			'.sr-drag-ghost .sr-ws-title{color:var(--dsw-alias-label-primary,#111)}',
			'.sr-group.is-group-dragging .sr-ws-row{background:var(--dsw-alias-bg-layer-1,#fff);box-shadow:0 10px 24px rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.06);cursor:grabbing}',
			'.sr-group.is-group-dragging .sr-row{background:transparent;box-shadow:none}',
			'.sr-group-list{display:flex;flex-direction:column;gap:5px}',
			'.sr-group:has(.sr-group-body.is-open){margin-bottom:3px}',
			'.sr-root.is-resizing .sr-section{transition:none !important}',
			'.sr-root.is-resizing .sr-section-ws{flex:0 0 var(--sr-drag-ws,auto) !important;height:auto !important;max-height:none !important}',
			'.sr-root.is-resizing .sr-section-recent{flex:1 1 0 !important;height:auto !important;min-height:0 !important}',
			'.sr-root.is-global-scroll{overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain}',
			'.sr-root.is-global-scroll .sr-body{display:block;flex:none;overflow:visible;padding-top:0}',
			'.sr-root.is-global-scroll .sr-section{flex:none !important;max-height:none !important;height:auto !important;margin-bottom:6px}',
			'.sr-root.is-global-scroll .sr-section.is-collapsed{height:34px !important;min-height:34px !important;overflow:hidden !important;margin-bottom:6px}',
			'.sr-root:not(.is-global-scroll) .sr-section-recent{margin-top:-2px}',
			'.sr-root:not(.is-global-scroll) .sr-section-recent .sr-section-label{position:relative;top:-1px}',
			'.sr-root:not(.is-global-scroll) .sr-resize{z-index:3}',
			'[class*="scrollArea"]:has(.sr-root){grid-template-rows:8px max-content 2px minmax(0,1fr)}',
			'.sr-root{max-height:100%}',
			'.sr-root.is-resizing .sr-resize{opacity:1}',
			'.sr-ws-row{display:flex;flex:0 0 auto;align-items:center;border-radius:10px;transition:background .16s ease,box-shadow .16s ease}',
			'.sr-ws-row:hover{background:rgba(0,0,0,.04);background:color-mix(in srgb,var(--dsw-alias-label-primary,#111) 5%,transparent);box-shadow:0 1px 2px rgba(0,0,0,.05)}',
						'.sr-ws-head{display:flex;align-items:center;gap:7px;flex:1 1 auto;min-width:0;height:32px;padding:0 7px 0 5px;border:none;background:transparent;cursor:pointer;text-align:left;font-family:inherit;font-size:var(--sr-fs-group);font-weight:400;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-ws-title{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:clip;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent)}',
			'.sr-ws-icon{flex:none;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.42))}',
			'.sr-chevron{flex:none;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.4));transform:rotate(90deg);transition:transform .16s ease}',
			'.sr-ws-row.is-collapsed .sr-chevron{transform:rotate(0deg)}',
			'.sr-ws-more{display:none;margin-right:3px;gap:6px}',
			'.sr-ws-status{display:inline-flex;align-items:center;justify-content:center;width:14px;flex:none;margin-right:11px}',
			'.sr-row-tail{position:relative;display:inline-flex;align-items:center;justify-content:flex-end;flex:0 0 20px;width:20px;height:20px}',
			'.sr-row-tail-status{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px}',
			'.sr-row:hover .sr-row-tail-status{display:none}',
			'.sr-row-tail .sr-row-more{display:none}',
			'.sr-row:hover .sr-row-tail .sr-row-more{display:inline-flex;opacity:1}',
			
			'.sr-ws-row:hover .sr-ws-status{display:none}',
			'.sr-ws-more .sr-icon-btn{width:24px;height:24px;border-radius:6px}',
			'.sr-ws-row:hover .sr-ws-more{display:inline-flex;opacity:1}',
			'.sr-group-body{padding-left:0;margin-left:0;border-left:none;display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .24s cubic-bezier(.4,0,.2,1),opacity .18s ease}',
			'.sr-group-body.is-open{grid-template-rows:1fr;opacity:1}',
			'.sr-group-inner{overflow:hidden;min-height:0;padding:2px 0 0}',
			'.sr-group-empty{padding:3px 8px 5px;font-size:11px;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-node{margin-bottom:1px}',
			'.sr-node-head{display:flex;align-items:center;gap:4px;width:100%;height:24px;padding:0 4px;border:none;background:transparent;cursor:pointer;text-align:left;font-family:inherit;font-size:calc(var(--sr-fs-group) * .88);letter-spacing:.02em;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-node-head:hover{color:var(--dsw-alias-label-primary,#111)}',
			'.sr-node-head.is-collapsed .sr-chevron{transform:rotate(0deg)}',
			'.sr-node-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.sr-node-body{padding-left:8px}',
			'.sr-empty{display:flex;flex:1 1 auto;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 8px;color:var(--dsw-alias-label-primary,#111);font-size:11.5px;text-align:center}',
			'.sr-empty-action{border:none;background:transparent;color:var(--dsw-alias-brand-primary,#4d6bfe);cursor:pointer;font-size:11.5px;font-family:inherit;padding:2px 4px;border-radius:4px}',
			'.sr-empty-action:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.13))}',
			'.sr-pending{padding:18px 8px;text-align:center;font-size:11.5px;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-results{padding-top:0}',
			'.sr-results-label{padding:8px 6px 3px;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-results-note{padding:6px;font-size:11px;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-menu{position:fixed;z-index:1200;min-width:170px;max-width:212px;max-height:min(86vh,900px);overflow-y:auto;overscroll-behavior:contain;padding:4px;border-radius:var(--dsw-radius-lg,10px);background:#FCFDFD;background:color-mix(in srgb,#FCFDFD 88%,transparent);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:.5px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));box-shadow:var(--dsw-elevation-prominent,0 12px 28px rgba(0,0,0,.16),0 2px 6px rgba(0,0,0,.08));animation:sr-fade .12s ease}',
			'body[data-ds-dark-theme] .sr-menu{background:#29292D;background:color-mix(in srgb,#29292D 90%,transparent);border-color:rgba(255,255,255,.10);box-shadow:var(--dsw-elevation-prominent,0 12px 28px rgba(0,0,0,.52),0 2px 6px rgba(0,0,0,.34))}',
			'.sr-menu::-webkit-scrollbar{width:5px}',
			'.sr-menu::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--dsw-alias-label-tertiary,rgba(0,0,0,.3)) 42%,transparent);border-radius:3px}',
			'.sr-menu-chips{display:flex;align-items:center;gap:6px;padding:2px 8px 6px}',
			'.sr-menu-chips-label{flex:1 1 auto;font-size:calc(var(--sr-fs-row) * .9);color:var(--dsw-alias-label-primary,#111)}',
			'.sr-chips{display:inline-flex;gap:3px;flex:none}',
			'.sr-chip{height:22px;min-width:26px;padding:0 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.12));background:transparent;color:var(--dsw-alias-label-primary,#111);font-size:calc(var(--sr-fs-row) * .84);font-family:inherit;cursor:pointer;line-height:20px}',
			'.sr-chip:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
			'.sr-chip.is-on{background:var(--dsw-alias-brand-primary,#4d6bfe);border-color:transparent;color:#fff}',
			'.sr-stepper{display:inline-flex;align-items:center;gap:2px;flex:none}',
			'.sr-stepper-btn{min-width:22px;height:22px;padding:0 4px;font-size:calc(var(--sr-fs-row) * .95);line-height:20px}',
			'.sr-stepper-btn:disabled{opacity:.35;cursor:default}',
			'.sr-stepper-val{min-width:46px;text-align:center;font-size:calc(var(--sr-fs-row) * .84);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-stepper-edit{background:transparent;border:none;padding:0;cursor:text;border-radius:6px}',
			'.sr-stepper-edit:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
			'.sr-stepper-input{width:52px;height:22px;box-sizing:border-box;text-align:center;font-family:inherit;font-size:calc(var(--sr-fs-row) * .84);font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary,#111);background:var(--dsw-alias-bg-layer-2,#fff);border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.2));border-radius:6px;outline:none;padding:0 4px}',
			'.sr-menu-label{padding:4px 8px 2px;font-size:calc(var(--sr-fs-row) * .8);letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-menu-sep{height:1px;margin:4px 6px;background:var(--dsw-alias-border-l2,rgba(0,0,0,.08))}',
			'.sr-menu-item{display:flex;align-items:center;gap:6px;width:100%;height:28px;padding:0 6px;white-space:nowrap;border:none;border-radius:var(--dsw-radius-md,6px);background:transparent;color:var(--dsw-alias-label-primary,#111);font-size:calc(var(--sr-fs-row) * .96);font-family:inherit;text-align:left;cursor:pointer}',
			'.sr-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14))}',
			'.sr-menu-item.is-selected{color:var(--dsw-alias-label-primary,#111)}',
			'.sr-menu-item.is-selected .sr-menu-check{color:var(--dsw-alias-brand-primary,#4d6bfe)}',
			'.sr-menu-item.is-danger{color:var(--dsw-alias-state-error-primary,#d1242f)}',
			'.sr-menu-item:disabled{opacity:.5;cursor:default}',
			'.sr-menu-icon{display:inline-flex;justify-content:center;width:14px;flex:none;opacity:.85}',
			'.sr-menu-text{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:clip;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 16px),transparent)}',
			'.sr-menu-check{display:inline-flex;justify-content:center;width:14px;flex:none}',
			'.sr-overlay{position:fixed;inset:0;z-index:1300;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.26);backdrop-filter:blur(2px);animation:sr-fade .12s ease}',
			'.sr-dialog{width:min(360px,100%);box-sizing:border-box;padding:16px;border-radius:14px;background:#F9FAFB;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.1)) 90%,transparent);box-shadow:0 26px 64px rgba(0,0,0,.28)}',
			'body[data-ds-dark-theme] .sr-dialog{background:#29292D}',
			'.sr-dialog-title{font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary,#111);margin-bottom:6px}',
			'.sr-dialog-desc{font-size:12px;line-height:1.6;color:var(--dsw-alias-label-primary,#111);margin-bottom:10px}',
			'.sr-dialog-body{margin-bottom:10px}',
			'.sr-dialog-footer{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}',
			'.sr-field-label{display:block;font-size:11px;color:var(--dsw-alias-label-primary,#111);margin-bottom:6px}',
			'.sr-input{width:100%;box-sizing:border-box;height:32px;padding:0 10px;border-radius:8px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.12)) 90%,transparent);background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-label-primary,#111);font-size:13px;font-family:inherit;outline:none}',
			'.sr-input:focus{border-color:var(--dsw-alias-brand-primary,#4d6bfe);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 22%,transparent)}',
			'.sr-error{margin-top:6px;font-size:11px;color:var(--dsw-alias-state-error-primary,#d1242f)}',
			'.sr-btn{height:30px;padding:0 12px;border-radius:8px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.12)) 90%,transparent);background:var(--dsw-alias-bg-layer-2,#f4f4f5);color:var(--dsw-alias-label-primary,#111);font-size:12.5px;font-family:inherit;cursor:pointer}',
			'.sr-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.16))}',
			'.sr-btn.is-primary{background:var(--dsw-alias-brand-primary,#4d6bfe);border-color:transparent;color:#fff}',
			'.sr-btn.is-danger{background:var(--dsw-alias-state-error-primary,#d1242f);border-color:transparent;color:#fff}',
			'.sr-btn.is-ghost{background:transparent}',
			'.sr-btn:disabled{opacity:.55;cursor:default}',
			'.sr-toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:1400;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 32px);padding:8px 12px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-bg-overlay,#fff) 90%,transparent);backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1,rgba(0,0,0,.1)) 90%,transparent);box-shadow:0 14px 34px rgba(0,0,0,.22);font-size:12px;color:var(--dsw-alias-label-primary,#111);animation:sr-fade .14s ease}',
			'.sr-toast-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
			'.sr-toast-link{border:none;background:transparent;color:var(--dsw-alias-brand-primary,#4d6bfe);font-size:12px;font-family:inherit;cursor:pointer;padding:0 2px;white-space:nowrap}',
			'.sr-toast-or{font-size:11px;color:var(--dsw-alias-label-primary,#111)}',
			'.sr-toast-close{display:inline-flex;border:none;background:transparent;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.45));cursor:pointer;padding:2px;border-radius:4px}',
			'.sr-root.is-rail{align-items:center;padding:6px 0;gap:6px}',
			'.sr-rail-actions{display:flex;flex-direction:column;gap:4px;flex:none}',
			'.sr-rail-list{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1 1 auto;min-height:0;overflow-y:auto;padding:4px 0;width:100%}',
			'.sr-rail-btn{width:28px;height:28px;flex:none;display:flex;align-items:center;justify-content:center;border:none;border-radius:50%;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2,#f4f4f5) 80%,transparent);color:var(--dsw-alias-label-primary,#111);font-size:11.5px;font-family:inherit;cursor:pointer}',
			'.sr-rail-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.16))}',
			'.sr-rail-btn.is-current{background:var(--dsw-alias-brand-primary,#4d6bfe);color:#fff}',
			'.sr-rail-btn.is-archived{opacity:.5}',
			'.sr-rail-empty{font-size:18px;color:var(--dsw-alias-label-tertiary,rgba(0,0,0,.3));padding:6px}',
			'@keyframes sr-pulse{0%,100%{opacity:1}50%{opacity:.4}}',
			'@keyframes sr-fade{from{opacity:0}to{opacity:1}}',
			'.sr-row-title,.sr-ws-title,.sr-section-label,.sr-node-head,.sr-row-time,.sr-row-badge,.sr-menu-text,.sr-menu-label,.sr-menu-chips-label,.sr-chip,.sr-empty-text,.sr-group-empty,.sr-dialog-title,.sr-dialog-desc,.sr-field-label,.sr-search-input,.sr-toast-text,.sr-count,.sr-row-snippet,.sr-results-label,.sr-results-note,.sr-pending,.sr-rail-btn{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}',
		].join('\n');

		/* ------------------------------------------------------------------ *
		 * Plugin entry
		 * ------------------------------------------------------------------ */
		return {
			inject: ['slots', 'locale'],
			apply: function apply(ctx) {
				ctx.effect(function () {
					return ctx.locale.register(NS, { zh: ZH, en: EN });
				}, 'sidebar-recent: dictionaries');

				ctx.effect(function () {
					const style = document.createElement('style');
					style.setAttribute('data-sidebar-recent', 'global-typography');
					style.textContent = GLOBAL_FONT_CSS;
					document.head.appendChild(style);
					return function () {
						if (style.parentNode) style.parentNode.removeChild(style);
					};
				}, 'sidebar-recent: global typography');

				function lookup(name) {
					try {
						if (typeof ctx.get === 'function') {
							const value = ctx.get(name);
							if (value) return value;
						}
					} catch (err) {
						/* service not mounted yet */
					}
					try {
						return ctx[name] || null;
					} catch (err) {
						return null;
					}
				}

				const ui = function () { return lookup('uiWorkspace'); };
				const store = function () { return lookup('workspaces'); };
				const sessions = function () { return lookup('sessions'); };

				function callUi(method, args) {
					const service = ui();
					if (!service || typeof service[method] !== 'function') return Promise.reject(new Error('uiWorkspace.' + method + ' unavailable'));
					return Promise.resolve(service[method].apply(service, args));
				}

				function callStore(method, args) {
					const service = store();
					if (!service || typeof service[method] !== 'function') return Promise.reject(new Error('workspaces.' + method + ' unavailable'));
					return Promise.resolve(service[method].apply(service, args));
				}

				const actions = {
					openSession: function (id) { return callUi('openSession', [id]); },
					startSession: function (workspaceId, options) {
						const service = ui();
						if (!service || typeof service.startSession !== 'function') return;
						try {
							service.startSession(workspaceId, options);
						} catch (err) {
							service.startSession(workspaceId);
						}
					},
					pickDirectory: function () { return callUi('pickDirectory', []); },
					createWorkspace: function (path) {
						const service = store();
						if (!service || typeof service.create !== 'function') return Promise.reject(new Error('workspaces.create unavailable'));
						return Promise.resolve(service.create({ path: path }));
					},
					renameWorkspace: function (id, title) { return callStore('rename', [id, title]); },
					deleteWorkspace: function (id) { return callStore('delete', [id]); },
					insertSessionBefore: function (workspaceId, sessionId, beforeSessionId) {
						return callStore('insertSessionBefore', [workspaceId, sessionId, beforeSessionId]);
					},
					forkSession: function (id) { return callUi('forkSession', [id]); },
					archiveSession: function (id, options) {
						const service = ui();
						if (service && typeof service.archiveSession === 'function') return Promise.resolve(service.archiveSession(id, options));
						return callStore('archiveSession', [id, options]);
					},
					unarchiveSession: function (id) {
						const service = ui();
						if (service && typeof service.unarchiveSession === 'function') return Promise.resolve(service.unarchiveSession(id));
						return callStore('unarchiveSession', [id]);
					},
					renameSession: function (id, title) {
						const service = sessions();
						if (!service || typeof service.using !== 'function') return Promise.reject(new Error('sessions.using unavailable'));
						return new Promise(function (resolve, reject) {
							try {
								service.using(id, { source: 'workspaceOperation' }, function (ref) {
									try {
										ref.binding.session.rename(title);
										resolve();
									} catch (err) {
										reject(err);
									}
								});
							} catch (err) {
								reject(err);
							}
						});
					},
					searchSessions: function (query, signal) {
						const service = sessions();
						if (!service || typeof service.search !== 'function') return Promise.resolve({ items: [], hasMore: false });
						return Promise.resolve(service.search(query, signal));
					}
				};

				/* Pin support is optional in the shipped service surface: expose the
				 * props only when the running host actually implements them. */
				Object.defineProperty(actions, 'pinSession', {
					enumerable: true,
					get: function () {
						const service = ui();
						if (!service || typeof service.pinSession !== 'function') return undefined;
						return function (id) { return Promise.resolve(service.pinSession(id)); };
					}
				});
				Object.defineProperty(actions, 'unpinSession', {
					enumerable: true,
					get: function () {
						const service = ui();
						if (!service || typeof service.unpinSession !== 'function') return undefined;
						return function (id) { return Promise.resolve(service.unpinSession(id)); };
					}
				});

				ctx.effect(function () {
					const nav = lookup('uiWorkspace');
					if (!nav || typeof nav.startSession !== 'function') return undefined;
					const original = nav.startSession;
					if (original.__sidebarRecentPatched) return undefined;
					const patched = function (workspaceId, options) {
						if (workspaceId === undefined || workspaceId === null) {
							const focus = getFocusWorkspaceId();
							if (focus) return original.call(nav, focus, options);
						}
						return original.call(nav, workspaceId, options);
					};
					patched.__sidebarRecentPatched = true;
					try {
						nav.startSession = patched;
					} catch (err) {
						return undefined;
					}
					return function () {
						try {
							if (nav.startSession === patched) nav.startSession = original;
						} catch (err) {
							/* ignore */
						}
					};
				}, 'sidebar-recent: new session focus');

				ctx.slots.inject('sidebar.workspaces', function () {
					return ctx.slots.register({
						name: 'sidebar.workspaces',
						priority: -100,
						locale: NS,
						inject: function () { return actions; }
					}, SidebarRecent);
				});
			}
		};
	}
});
