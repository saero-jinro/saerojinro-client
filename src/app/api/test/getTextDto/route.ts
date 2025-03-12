import { NextResponse } from 'next/server';

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

// 예시 텍스트 에디터 데이터 파일
const testJSON = `{
  "type":"doc",
  "content":[
    {"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"H1"}]},
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"H2"}]},
    {"type":"heading","attrs":{"level":3},"content":[
      {"type":"text","text":"H3"},
      {"type":"hardBreak"},
      {"type":"text","text":"H4 (만들꺼임)"},
      {"type":"hardBreak"},
      {"type":"text","text":"H5 (만들꺼임)"},
      {"type":"hardBreak"},
      {"type":"text","text":"H6 (만들꺼임)"}
    ]},
    {"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"B"}]},
    {"type":"paragraph","content":[
      {"type":"text","marks":[{"type":"italic"}],"text":"I"},
      {"type":"hardBreak"},
      {"type":"text","marks":[{"type":"underline"}],"text":"U (밑줄)"}
    ]},
    {"type":"paragraph","content":[{"type":"text","marks":[{"type":"strike"}],"text":"S"}]},
    {"type":"codeBlock","attrs":{"language":"javascript"},"content":[{"type":"text","text":"const x = 10;"}]},
    {"type":"horizontalRule"},
    {"type":"paragraph","content":[
      {"type":"text","text":"link (링크로 변환 스타일 할당 안함...)"},
      {"type":"hardBreak"},
      {"type":"text","text":"unlink (링크 해제)"},
      {"type":"hardBreak"},
      {"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#ef0c0c"}}],"text":"글씨 색 변환 (빨강)"}
    ]}
  ]
}`;

export const GET = async (): Promise<NextResponse> => {
  try {
    if (!testJSON) {
      throw new Error('테스트 파일이 없어요.');
    }

    const response: ApiResponse<string> = {
      ok: true,
      data: testJSON,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API 호출 실패', error);

    const errorResponse: ApiResponse<null> = {
      ok: false,
      error: error instanceof Error ? error.message : '알 수 없는 에러',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
};
