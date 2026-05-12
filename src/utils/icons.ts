/**
 * lucide-static에서 필요한 아이콘을 가져와 16×16으로 정규화한다.
 * 모든 아이콘은 stroke="currentColor" 이므로 CSS color 상속.
 */
import {
  // 서식 툴바
  Bold, Italic, Underline, Strikethrough,
  Undo2, Redo2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Indent, Outdent,
  Baseline, Highlighter,
  BetweenVerticalStart, MoveHorizontal,
  // 파일
  FilePlus, FolderOpen, Save, FileOutput, Printer, Settings, Clock, History,
  // 편집
  Scissors, Copy, Clipboard, ClipboardX, SquareDashed, Search, ImagePlus,
  // 삽입
  Image, Images, Film, PlayCircle, Link, Link2Off, Bookmark,
  PenLine, Smile, MessageCircle, MessageSquare,
  Calendar, Minus, Omega, MonitorPlay,
  SeparatorHorizontal, LayoutTemplate, FormInput,
  // 보기
  LayoutDashboard, Code2, Eye, Type, FileText, Maximize2, Minimize2, Ruler, Grid3x3, BoxSelect,
  // 표
  Table, TableProperties, LayoutGrid, TableCellsMerge, TableCellsSplit,
  ArrowUpFromLine, ArrowDownFromLine, ArrowLeftFromLine, ArrowRightFromLine,
  Rows3, Columns3, Trash2,
  // 서식
  Paintbrush, Paintbrush2, RemoveFormatting, List, ListOrdered, Superscript, Subscript,
  // 기타
  Accessibility, ShieldCheck, SquareCheck, Sigma, User,
  // 도움말
  Keyboard, BookOpen, Info,
  // 템플릿 트리 / 사용자 식별
  Folder, File, Users, UserCircle, ChevronRight, ChevronDown, Plus, Pencil,
  Hash, GripVertical,
} from 'lucide-static';

/** SVG width/height 24 → N으로 정규화 */
export function pxN(svg: string, n: number): string {
  return svg
    .replace(/width="24"/, `width="${n}"`)
    .replace(/height="24"/, `height="${n}"`);
}

function px16(svg: string): string { return pxN(svg, 16); }
function px14(svg: string): string { return pxN(svg, 14); }
function px12(svg: string): string { return pxN(svg, 12); }

export const Icons = {
  // 서식 툴바
  bold:       px16(Bold),
  italic:     px16(Italic),
  underline:  px16(Underline),
  strike:     px16(Strikethrough),
  undo:       px16(Undo2),
  redo:       px16(Redo2),
  alignLeft:     px16(AlignLeft),
  alignCenter:   px16(AlignCenter),
  alignRight:    px16(AlignRight),
  alignJustify:  px16(AlignJustify),
  indent:     px16(Indent),
  outdent:    px16(Outdent),
  foreColor:  px16(Baseline),
  backColor:  px16(Highlighter),
  lineHeight:    px16(BetweenVerticalStart),
  letterSpacing: px16(MoveHorizontal),

  // 파일
  fileNew:    px16(FilePlus),
  fileOpen:   px16(FolderOpen),
  save:       px16(Save),
  fileSaveAs: px16(FileOutput),
  print:      px16(Printer),
  settings:   px16(Settings),
  clock:      px16(Clock),
  history:    px16(History),

  // 편집
  cut:        px16(Scissors),
  copy:       px16(Copy),
  paste:      px16(Clipboard),
  pastePlain: px16(ClipboardX),
  selectAll:  px16(SquareDashed),
  search:     px16(Search),
  imageEdit:  px16(ImagePlus),

  // 삽입
  image:      px16(Image),
  images:     px16(Images),
  videoTag:   px16(Film),
  embedVideo: px16(PlayCircle),
  link:       px16(Link),
  linkOff:    px16(Link2Off),
  bookmark:   px16(Bookmark),
  signature:  px16(PenLine),
  emoji:      px16(Smile),
  tooltip:    px16(MessageCircle),
  tooltipList: px16(MessageSquare),
  calendar:   px16(Calendar),
  hr:         px16(Minus),
  symbol:     px16(Omega),
  youtube:    px16(MonitorPlay),
  pageBreak:  px16(SeparatorHorizontal),
  template:   px16(LayoutTemplate),
  formField:  px16(FormInput),

  // 보기
  viewDesign:   px16(LayoutDashboard),
  viewHtml:     px16(Code2),
  viewPreview:  px16(Eye),
  viewText:     px16(Type),
  viewPage:     px16(FileText),
  fullscreen:   px16(Maximize2),
  fullscreenExit: px16(Minimize2),
  maximize2_14: px14(Maximize2),
  minimize2_14: px14(Minimize2),
  ruler:        px16(Ruler),
  grid:         px16(Grid3x3),
  hiddenBorder: px16(BoxSelect),

  // 표
  table:          px16(Table),
  tableProps:     px16(TableProperties),
  cellProps:      px16(LayoutGrid),
  mergeCells:     px16(TableCellsMerge),
  splitCell:      px16(TableCellsSplit),
  rowAbove:       px16(ArrowUpFromLine),
  rowBelow:       px16(ArrowDownFromLine),
  colLeft:        px16(ArrowLeftFromLine),
  colRight:       px16(ArrowRightFromLine),
  rowDelete:      px16(Rows3),
  colDelete:      px16(Columns3),
  tableDelete:    px16(Trash2),

  // 서식
  painterCopy:   px16(Paintbrush),
  painterPaste:  px16(Paintbrush2),
  formatClear:   px16(RemoveFormatting),
  ul:            px16(List),
  ol:            px16(ListOrdered),
  sup:           px16(Superscript),
  sub:           px16(Subscript),

  // 기타
  a11y:     px16(Accessibility),
  privacy:  px16(ShieldCheck),
  form:     px16(SquareCheck),
  calc:     px16(Sigma),
  userMode: px16(User),

  // 도움말
  shortcuts: px16(Keyboard),
  guide:     px16(BookOpen),
  about:     px16(Info),

  // 템플릿 트리 / 사용자 식별 (16px)
  folder:         px16(Folder),
  folderOpen:     px16(FolderOpen),
  file:           px16(File),
  fileText16:     px16(FileText),
  users16:        px16(Users),
  user16:         px16(User),
  userCircle:     px16(UserCircle),
  plus:           px16(Plus),
  pencil:         px16(Pencil),
  trash:          px16(Trash2),
  link16:         px16(Link),
  chevronRight:   px16(ChevronRight),
  chevronDown:    px16(ChevronDown),
  // 14px 변형
  folder14:       px14(Folder),
  folderOpen14:   px14(FolderOpen),
  file14:         px14(File),
  fileText14:     px14(FileText),
  users14:        px14(Users),
  user14:         px14(User),
  grip14:         px14(GripVertical),
  chevronRight12: px12(ChevronRight),
  chevronDown12:  px12(ChevronDown),
  users12:        px12(Users),
  user12:         px12(User),
  // 양식 필드 타입 아이콘 (14px)
  fieldText:   px14(Type),
  fieldNumber: px14(Hash),
  fieldDate:   px14(Calendar),
  // 48px — 미리보기 빈 상태
  layoutTemplate48: pxN(LayoutTemplate, 48),
} as const;

export type IconName = keyof typeof Icons;

/** action 문자열 → Icons 키 매핑 */
export const ACTION_ICON: Record<string, IconName> = {
  // 파일
  'file:new':     'fileNew',
  'file:open':    'fileOpen',
  'file:save':    'save',
  'file:saveas':  'fileSaveAs',
  'file:print':   'print',
  'file:history': 'history',
  'settings':     'settings',
  // 편집
  'edit:cut':          'cut',
  'edit:copy':         'copy',
  'edit:paste':        'paste',
  'edit:paste-plain':  'pastePlain',
  'edit:select-all':   'selectAll',
  'find-replace':      'search',
  'edit:image-edit':   'imageEdit',
  // 삽입
  'image':              'image',
  'insert:multi-image': 'images',
  'insert:video':       'videoTag',
  'insert:embed':       'embedVideo',
  'insert:link':        'link',
  'insert:link-remove': 'linkOff',
  'insert:bookmark':    'bookmark',
  'insert:signature':   'signature',
  'insert:emoji':       'emoji',
  'insert:tooltip':     'tooltip',
  'insert:tooltip-list': 'tooltipList',
  'insert:datetime':    'calendar',
  'insert:hr':          'hr',
  'insert:symbol':      'symbol',
  'insert:pagebreak':   'pageBreak',
  'misc:template':      'template',
  // 보기
  'view:design':        'viewDesign',
  'view:html':          'viewHtml',
  'view:preview':       'viewPreview',
  'view:text':          'viewText',
  'view:page':          'viewPage',
  'view:fullscreen':    'fullscreen',
  'view:ruler':         'ruler',
  'view:grid':          'grid',
  'view:hidden-border': 'hiddenBorder',
  // 표
  'table':              'table',
  'table:table-props':  'tableProps',
  'table:cell-props':   'cellProps',
  'table:merge':        'mergeCells',
  'table:split-cell':   'splitCell',
  'table:row-above':    'rowAbove',
  'table:row-below':    'rowBelow',
  'table:col-left':     'colLeft',
  'table:col-right':    'colRight',
  'table:row-delete':   'rowDelete',
  'table:col-delete':   'colDelete',
  'table:delete':       'tableDelete',
  'table:align-left':   'alignLeft',
  'table:align-center': 'alignCenter',
  'table:align-right':  'alignRight',
  // 서식
  'format:painter-copy':  'painterCopy',
  'format:painter-paste': 'painterPaste',
  'format:clear':         'formatClear',
  'format:ul':            'ul',
  'format:ol':            'ol',
  'format:sup':           'sup',
  'format:sub':           'sub',
  // 기타
  'misc:a11y':      'a11y',
  'misc:privacy':   'privacy',
  'misc:form':      'form',
  'misc:calc':      'calc',
  'misc:user-mode': 'userMode',
  // 도움말
  'help:shortcuts': 'shortcuts',
  'help:guide':     'guide',
  'help:about':     'about',
};
