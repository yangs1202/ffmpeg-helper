# ffmpeg-helper

자주 사용하는 FFmpeg 명령어를 쉽게 사용할 수 있는 CLI 도구입니다.

## 설치

```bash
npm link
```

## 사용법

### 1. 영상 자르기 (cut)

영상을 지정한 시간(초) 단위로 여러 개의 파일로 분할합니다.

```bash
ffmpeg-helper cut <초> <입력파일> <출력파일>
```

**예시:**
```bash
ffmpeg-helper cut 60 /Volumes/yangs-svr/medias/251027_소풍_720P.mp4 /Volumes/yangs-svr/medias/251027.mp4
```

이 명령은 60초마다 영상을 잘라서 다음과 같은 파일들을 생성합니다:
- `251027_001.mp4`
- `251027_002.mp4`
- `251027_003.mp4`
- ...

### 2. 음소거 (mute)

영상에서 오디오를 제거합니다.

```bash
ffmpeg-helper mute <입력파일> <출력파일>
```

**예시:**
```bash
ffmpeg-helper mute /Volumes/촬영본/촬영본/민아/완성/251027_소풍_4K60.mp4 소풍_4K_NO_SOUND.mp4
```

## 참고

- 이 도구는 FFmpeg가 시스템에 설치되어 있어야 합니다.
- FFmpeg 설치: `brew install ffmpeg` (macOS)
