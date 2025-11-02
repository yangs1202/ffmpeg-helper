#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('사용법:');
  console.log('  ffmpeg-helper cut <초> <입력파일> <출력파일>');
  console.log('  ffmpeg-helper mute <입력파일> <출력파일>');
  console.log('');
  console.log('예시:');
  console.log('  ffmpeg-helper cut 60 input.mp4 output.mp4');
  console.log('  ffmpeg-helper mute input.mp4 output.mp4');
  process.exit(1);
}

const command = args[0];

function runFFmpeg(ffmpegArgs) {
  console.log('실행 명령:', 'ffmpeg', ffmpegArgs.join(' '));
  console.log('');

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, {
    stdio: 'inherit'
  });

  ffmpeg.on('close', (code) => {
    if (code === 0) {
      console.log('\n완료되었습니다!');
    } else {
      console.error(`\nffmpeg가 코드 ${code}로 종료되었습니다.`);
      process.exit(code);
    }
  });

  ffmpeg.on('error', (err) => {
    console.error('ffmpeg 실행 오류:', err.message);
    console.error('ffmpeg가 설치되어 있는지 확인해주세요.');
    process.exit(1);
  });
}

switch (command) {
  case 'cut': {
    if (args.length < 4) {
      console.error('사용법: ffmpeg-helper cut <초> <입력파일> <출력파일>');
      console.error('예시: ffmpeg-helper cut 60 input.mp4 output.mp4');
      process.exit(1);
    }

    const segmentTime = args[1];
    const inputFile = args[2];
    const outputFile = args[3];

    // 출력 파일명에서 확장자 분리
    const ext = path.extname(outputFile);
    const basename = outputFile.slice(0, -ext.length);
    const outputPattern = `${basename}_%03d${ext}`;

    const ffmpegArgs = [
      '-i', inputFile,
      '-c', 'copy',
      '-map', '0',
      '-segment_time', segmentTime,
      '-f', 'segment',
      '-reset_timestamps', '1',
      outputPattern
    ];

    runFFmpeg(ffmpegArgs);
    break;
  }

  case 'mute': {
    if (args.length < 3) {
      console.error('사용법: ffmpeg-helper mute <입력파일> <출력파일>');
      console.error('예시: ffmpeg-helper mute input.mp4 output.mp4');
      process.exit(1);
    }

    const inputFile = args[1];
    const outputFile = args[2];

    const ffmpegArgs = [
      '-i', inputFile,
      '-an',
      '-vcodec', 'copy',
      outputFile
    ];

    runFFmpeg(ffmpegArgs);
    break;
  }

  default:
    console.error(`알 수 없는 명령: ${command}`);
    console.error('사용 가능한 명령: cut, mute');
    process.exit(1);
}
