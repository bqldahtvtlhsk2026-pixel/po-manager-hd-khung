/* PO Manager HĐ khung – P.QLHT · BQLDAHTVT */
'use strict';
const C = window.PO_CONFIG;
const LOAI = {
  LHSK:       { ten: 'Lễ hội sự kiện',      ngan: 'LHSK',       ic: 'tower' },
  NHA_TRAM:   { ten: 'Củng cố nhà trạm',    ngan: 'Nhà trạm',   ic: 'building' },
  TRUYEN_DAN: { ten: 'Củng cố truyền dẫn',  ngan: 'Truyền dẫn', ic: 'route' },
  GPON:       { ten: 'GPON',                ngan: 'GPON',       ic: 'fiber' }
};
const LOAI_CT = { LHSK: ['LHSK', 'BTS 4G', 'Khác'], NHA_TRAM: ['Nhà trạm', 'Khác'], TRUYEN_DAN: ['Truyền dẫn', 'Khác'], GPON: ['GPON', 'Khác'] };
const TIEN_DO = ['Chưa nghiệm thu', 'Đã nghiệm thu', 'Đã quyết toán', 'Hủy'];
const TT = { cho_duyet: ['k-warn', 'Chờ duyệt'], da_duyet: ['k-ok', 'Đã duyệt'], tu_choi: ['k-crit', 'Bị từ chối'] };
const dsDoiTac = h => (h && Array.isArray(h.ds_doi_tac) && h.ds_doi_tac.length) ? h.ds_doi_tac : (h && h.doi_tac ? [h.doi_tac] : []);
const nhanHd = h => `HĐ ${LOAI[h.loai].ngan} ${h.nam} – ${h.so_hd}`;

/* ---------- Icon ---------- */
const P = {
  home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  plus: 'M12 5v14M5 12h14',
  check: 'M20 6 9 17l-5-5',
  gauge: 'M12 14l4-4M3.3 18a9 9 0 1 1 17.4 0',
  file: 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6M9 17h6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  key: 'M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  tower: 'M12 11v10M9 21h6M5 4.9a10 10 0 0 0 0 14.2M19 4.9a10 10 0 0 1 0 14.2M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  building: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M10 10h4',
  route: 'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 17c5 0 3-10 10-10',
  fiber: 'M2 12h6M8 12l6-6h7M8 12h13M8 12l6 6h7',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  x: 'M18 6 6 18M6 6l12 12',
  edit: 'M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z',
  trash: 'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  coins: 'M9 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM18.1 10.4A6 6 0 1 1 10.4 18M7 6h1v4M16.7 13.9l.7.7-2.8 2.8',
  wallet: 'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l12-4v4M17 14h.01',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
  receipt: 'M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4',
  paste: 'M9 4h6v3H9zM8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2',
  upload: 'M12 21V9M7 14l5-5 5 5M5 3h14'
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n] || ''}"/></svg>`;

/* ---------- Tiện ích ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => (n == null || n === '') ? '' : Math.round(Number(n)).toLocaleString('vi-VN');
const ty = n => (Number(n) / 1e9).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' tỷ';
const pctf = x => (x * 100).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
const dmy = s => { if (!s) return ''; const [y, m, d] = String(s).slice(0, 10).split('-'); return `${d}/${m}/${y}`; };
const dmyhm = s => { if (!s) return ''; const d = new Date(s); return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }); };
const digits = s => { const v = String(s ?? '').replace(/[^\d]/g, ''); return v ? Number(v) : 0; };
const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
let toastT;
function toast(msg, err) { const t = $('#toast'); t.textContent = msg; t.className = 'toast' + (err ? ' err' : ''); t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, err ? 5000 : 2800); }

async function rpc(fn, args = {}, withSession = true) {
  const body = withSession ? { p_phien: S.phien, ...args } : args;
  const r = await fetch(`${C.SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', headers: { apikey: C.SUPABASE_KEY, 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body)
  });
  const txt = await r.text();
  const data = txt ? JSON.parse(txt) : null;
  if (!r.ok) {
    const msg = (data && (data.message || data.hint)) || ('Lỗi ' + r.status);
    if (msg === 'PHIEN_HET_HAN') { dangXuat(true); throw new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'); }
    throw new Error(msg);
  }
  return data;
}
async function chay(fn, okMsg) {
  try { const r = await fn(); if (okMsg) toast(okMsg); return r; }
  catch (e) { toast(e.message || String(e), true); throw e; }
}

/* ---------- Trạng thái ---------- */
const S = {
  phien: ls.get('po_phien'), user: null, hds: [], loai: ls.get('po_loai') || 'LHSK', nam: null, hdId: null,
  tab: 'tongquan', th: [], po: [], busy: false,
  f: { q: '', tinh: '', tt: '', td: '', lct: '' }, st: '', kv: '', sort: 'pct', lim: 80,
  pbs: [], pbId: null, pbRows: null, pbEdit: {}, tk: null, nk: null, nkQ: '', ch: null, form: null, sel: new Set()
};
const isQT = () => S.user && S.user.vai_tro === 'quan_tri';
const curHd = () => S.hds.find(h => h.id === S.hdId) || null;

function stat(dk, hm) {
  if (!hm && !dk) return { k: 'none', t: 'Chưa giao hạn mức' };
  if (!dk) return { k: 'none', t: 'Chưa ký PO' };
  if (!hm) return { k: 'crit', t: 'Vượt hạn mức' };
  const r = dk / hm;
  if (r >= 1) return { k: 'crit', t: 'Vượt hạn mức' };
  if (r >= 0.8) return { k: 'warn', t: 'Sắp hết hạn mức' };
  if (r < 0.1) return { k: 'info', t: 'Dưới 10%' };
  return { k: 'ok', t: 'Bình thường' };
}
function rows() {
  return S.th.map(x => { const hm = Number(x.han_muc), dk = Number(x.da_ky); return { ma: x.tinh_ma, ten: x.ten, kv: x.kv, tt: x.thu_tu, hm, dk, cd: Number(x.cho_duyet), so: x.so_po, socho: x.so_cho, qt: Number(x.gt_quyet_toan), con: hm - dk, r: hm ? dk / hm : (dk ? 9.99 : 0), st: stat(dk, hm) }; });
}
function timePct(hd) {
  if (!hd || !hd.ngay_ky || !hd.ngay_het_han) return null;
  const a = new Date(hd.ngay_ky), b = new Date(hd.ngay_het_han), t = new Date(today());
  return Math.max(0, Math.min(1, (t - a) / (b - a)));
}
const bar = (dk, hm, cls = '') => { const r = hm ? dk / hm : (dk ? 1 : 0), s = stat(dk, hm).k; return `<div class="bar ${cls}" title="${pctf(r)}"><i class="f-${s}" style="width:${Math.min(r, 1) * 100}%"></i></div>`; };

/* ---------- Đăng nhập ---------- */
function renderLogin(mode = 'login', ten = '') {
  $('#app').innerHTML = `
  <div class="login"><form class="login-card" id="loginForm" autocomplete="on">
    <div class="brand"><div class="mark">PO</div><div><h1>PO Manager HĐ khung</h1><div class="sub">${esc(C.DON_VI)}</div></div></div>
    ${mode === 'setup' ? `<div class="note k-info">Tài khoản <b>${esc(ten)}</b> chưa có mật khẩu. Đặt mật khẩu lần đầu (tối thiểu 8 ký tự).</div>` : ''}
    <div class="fg"><label for="lg_ten">Tên đăng nhập</label><input type="text" id="lg_ten" name="username" autocomplete="username" value="${esc(ten)}" placeholder="PQLHT hoặc mã tỉnh (HNI, HCM…)" ${mode === 'setup' ? 'readonly' : ''} required></div>
    <div class="fg"><label for="lg_mk">${mode === 'setup' ? 'Mật khẩu mới' : 'Mật khẩu'}</label><input type="password" id="lg_mk" name="password" autocomplete="${mode === 'setup' ? 'new-password' : 'current-password'}" required></div>
    ${mode === 'setup' ? `<div class="fg"><label for="lg_mk2">Nhập lại mật khẩu</label><input type="password" id="lg_mk2" autocomplete="new-password" required></div>` : ''}
    <button class="btn primary" type="submit" style="justify-content:center">${ic('lock')}${mode === 'setup' ? 'Đặt mật khẩu và vào hệ thống' : 'Đăng nhập'}</button>
    <div class="sub">Quên mật khẩu: liên hệ ${esc(C.DAU_MOI)}</div>
  </form></div>`;
  $('#loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const t = $('#lg_ten').value.trim(), m = $('#lg_mk').value;
    try {
      let u;
      if (mode === 'setup') {
        if (m !== $('#lg_mk2').value) return toast('Hai lần nhập mật khẩu không khớp', true);
        u = await rpc('dat_mk_lan_dau', { p_ten: t, p_mk: m }, false);
      } else {
        u = await rpc('dang_nhap', { p_ten: t, p_mk: m }, false);
      }
      S.phien = u.phien; ls.set('po_phien', u.phien); S.user = u; S.mkTam = m; await khoiDong();
    } catch (err) {
      if (err.message === 'CHUA_DAT_MK') return renderLogin('setup', t.toUpperCase());
      toast(err.message, true);
    }
  });
  setTimeout(() => (mode === 'setup' ? $('#lg_mk') : $('#lg_ten')).focus(), 50);
}
async function dangXuat(silent) {
  if (!silent && S.phien) { try { await rpc('dang_xuat'); } catch (e) {} }
  S.phien = null; S.user = null; S.mkTam = null; S.batBuocDoiMk = false; ls.set('po_phien', null); $('#modal').innerHTML = ''; renderLogin();
}

/* ---------- Tải dữ liệu ---------- */
async function khoiDong() {
  if (!S.user) S.user = await rpc('toi');
  S.hds = await rpc('ds_hd');
  if (!S.hds.some(h => h.loai === S.loai) && S.hds.length) S.loai = S.hds[0].loai;
  chonLoai(S.loai, true);
  S.tab = 'tongquan';
  await taiHd();
  if (S.user.phai_doi_mk) moDoiMk(true);
}
function chonLoai(loai, keepNam) {
  S.loai = loai; ls.set('po_loai', loai);
  const ds = S.hds.filter(h => h.loai === loai);
  const nams = [...new Set(ds.map(h => h.nam))].sort((a, b) => b - a);
  if (!keepNam || !nams.includes(S.nam)) S.nam = nams[0] ?? null;
  const cung = ds.filter(h => h.nam === S.nam);
  S.hdId = cung.length ? (cung.find(h => h.trang_thai === 'dang_thuc_hien') || cung[0]).id : null;
}
async function taiHd() {
  S.pbs = []; S.pbLoaded = false; S.pbId = null; S.pbRows = null; S.pbEdit = {}; S.nk = null; S.sel = new Set(); S.form = null;
  if (!S.hdId) { S.th = []; S.po = []; render(); return; }
  render(true);
  try {
    const [th, po] = await Promise.all([rpc('tong_hop', { p_hd: S.hdId }), rpc('ds_po', { p_hd: S.hdId })]);
    S.th = th; S.po = po;
  } catch (e) { toast(e.message, true); }
  render();
}
async function lamMoi() {
  const [hds, th, po] = await Promise.all([rpc('ds_hd'), S.hdId ? rpc('tong_hop', { p_hd: S.hdId }) : [], S.hdId ? rpc('ds_po', { p_hd: S.hdId }) : []]);
  S.hds = hds; S.th = th; S.po = po; render();
}

/* ---------- Khung trang ---------- */
const TABS_QT = [['tongquan', 'Tổng quan', 'home'], ['po', 'Danh sách PO', 'list'], ['duyet', 'Chờ duyệt', 'check'], ['dangky', 'Nhập PO', 'plus'],
  ['hanmuc', 'Hạn mức', 'gauge'], ['hd', 'HĐ khung', 'file'], ['taikhoan', 'Tài khoản & tỉnh', 'users'], ['nhatky', 'Nhật ký', 'clock'], ['cauhinh', 'Cấu hình', 'sliders']];
const TABS_TINH = [['tongquan', 'Đơn vị', 'home'], ['po', 'PO của đơn vị', 'list'], ['dangky', 'Đăng ký PO', 'plus'], ['toanquoc', 'Toàn quốc', 'globe']];
const NO_HD_TABS = ['hd', 'taikhoan', 'cauhinh'];

function render(loading) {
  const u = S.user, hd = curHd();
  const tabs = isQT() ? TABS_QT : TABS_TINH;
  if (!tabs.some(t => t[0] === S.tab)) S.tab = 'tongquan';
  const ds = S.hds.filter(h => h.loai === S.loai);
  const nams = [...new Set(ds.map(h => h.nam))].sort((a, b) => b - a);
  const cung = ds.filter(h => h.nam === S.nam);
  const nCho = S.po.filter(p => p.trang_thai === 'cho_duyet').length;
  const pb = hd && hd.pb;
  $('#app').innerHTML = `
  <header class="topbar">
    <div class="brand"><div class="mark">PO</div><div><b>PO Manager HĐ khung</b><span>${esc(C.DON_VI)}</span></div></div>
    <div class="sp"></div>
    <div class="userchip" title="${esc(u.ho_ten || '')}"><span class="av">${esc((u.tinh_ma || 'QT').slice(0, 3))}</span><span class="nm">${esc(isQT() ? (u.ho_ten || u.ten_dn) : 'Viettel ' + u.tinh_ten)}</span></div>
    <button class="iconbtn" data-act="doiMk" title="Đổi mật khẩu" aria-label="Đổi mật khẩu">${ic('key')}</button>
    <button class="iconbtn" data-act="logout" title="Đăng xuất" aria-label="Đăng xuất">${ic('logout')}</button>
  </header>
  <section class="hero"><div class="hero-in">
    <div><h1>Quản lý P/O hợp đồng khung</h1><div class="sub">${isQT() ? 'Phòng Quản lý hạ tầng – Ban QLDA Hạ tầng Viễn thông' : 'Viettel ' + esc(u.tinh_ten) + ' · đăng ký và theo dõi P/O của đơn vị'}</div></div>
    <div class="types" role="group" aria-label="Loại hợp đồng khung">${Object.entries(LOAI).map(([k, v]) => {
      const n = S.hds.filter(h => h.loai === k).length;
      return `<button class="type" data-act="loai" data-v="${k}" aria-pressed="${S.loai === k}">${ic(v.ic)}<span>${v.ten}</span><span class="cnt">${n}</span></button>`;
    }).join('')}</div>
    <div class="hdbar">
      ${nams.length ? `<select id="selNam" data-f="nam" aria-label="Năm">${nams.map(n => `<option ${n === S.nam ? 'selected' : ''}>${n}</option>`).join('')}</select>` : ''}
      ${cung.length > 1 ? `<select id="selHd" data-f="hd" aria-label="Hợp đồng">${cung.map(h => `<option value="${h.id}" ${h.id === S.hdId ? 'selected' : ''}>${esc(h.so_hd)}</option>`).join('')}</select>` : ''}
      ${hd ? `<div class="hdmeta"><span>Số HĐ: <b>${esc(hd.so_hd)}</b></span><span>Giá trị: <b>${fmt(hd.gia_tri)} đ</b></span>
        <span>Ký: <b>${dmy(hd.ngay_ky) || '—'}</b>${hd.ngay_het_han ? ` · Hết hạn: <b>${dmy(hd.ngay_het_han)}</b>` : ''}</span>
        <span>Hạn mức: <b>${pb ? esc(pb.ten) : 'chưa ban hành'}</b></span>${hd.trang_thai === 'da_ket_thuc' ? '<span class="pill k-none">Đã kết thúc</span>' : ''}</div>`
        : `<div class="hdmeta"><span>Chưa có HĐ khung ${esc(LOAI[S.loai].ten)}.</span></div>`}
      ${hd ? `<button class="btn sm ghost-w" data-act="excel">${ic('download')}Xuất Excel</button>` : ''}
    </div>
  </div></section>
  <nav class="tabs" aria-label="Chức năng"><div class="tabs-in">${tabs.map(([id, t, i]) => `<button class="tab" data-act="tab" data-v="${id}" ${S.tab === id ? 'aria-current="page"' : ''}>${ic(i)}<span>${t}</span>${id === 'duyet' && nCho ? `<span class="badge">${nCho}</span>` : ''}</button>`).join('')}</div></nav>
  <main id="view" class="${loading ? 'loading' : ''}">${view()}</main>
  <div class="foot">Đầu mối hỗ trợ: ${esc(C.DAU_MOI)}</div>`;
  afterRender();
}
function view() {
  if (!S.hdId && !NO_HD_TABS.includes(S.tab)) {
    return `<div class="card empty">${ic(LOAI[S.loai].ic)}<div>Chưa có hợp đồng khung <b>${esc(LOAI[S.loai].ten)}</b>.</div>
      ${isQT() ? `<div style="margin-top:12px"><button class="btn primary" data-act="hdMoi">${ic('plus')}Thêm HĐ khung ${esc(LOAI[S.loai].ngan)}</button></div>` : ''}</div>`;
  }
  const V = { tongquan: isQT() ? vTongQuan : vDonVi, po: vPO, duyet: vDuyet, dangky: vDangKy, hanmuc: vHanMuc, hd: vHd, taikhoan: vTaiKhoan, nhatky: vNhatKy, cauhinh: vCauHinh, toanquoc: vToanQuoc };
  return V[S.tab]();
}

/* ---------- Biểu đồ (1 biểu đồ duy nhất): tỷ lệ sử dụng hạn mức theo tỉnh ---------- */
function chart(rs, me) {
  const data = [...rs].sort((a, b) => b.r - a.r);
  const tp = timePct(curHd());
  const maxR = Math.max(1.2, Math.min(2, Math.ceil(Math.max(...data.map(d => d.r), 0) * 10) / 10));
  const W = 1100, H = 300, L = 44, R = 12, T = 16, B = 46, cw = (W - L - R) / data.length, y = v => T + (H - T - B) * (1 - Math.min(v, maxR) / maxR);
  const ticks = []; for (let v = 0; v <= maxR + 1e-9; v += 0.2) ticks.push(v);
  const col = { crit: 'var(--crit)', warn: 'var(--warn)', ok: 'var(--ok)', info: 'var(--info)', none: 'var(--none)' };
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tỷ lệ sử dụng hạn mức theo tỉnh">
    ${ticks.map(v => `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke-width="1"/><text class="lbl" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`).join('')}
    ${data.map((d, i) => { const x = L + i * cw + cw * 0.18, w = cw * 0.64, yy = y(d.r), h = y(0) - yy;
      return `<g><title>${esc(d.ten)}: ${pctf(d.r)} (đã ký ${fmt(d.dk)} / hạn mức ${fmt(d.hm)} đ)</title>
        <rect x="${x}" y="${yy}" width="${w}" height="${Math.max(h, 0)}" rx="2" fill="${col[d.st.k]}" ${d.ma === me ? 'stroke="var(--fg)" stroke-width="2"' : ''}/>
        ${d.r >= 0.8 || d.ma === me ? `<text class="lblb" x="${x + w / 2}" y="${yy - 4}" text-anchor="middle">${Math.round(d.r * 100)}</text>` : ''}
        <text class="${d.ma === me ? 'lblb' : 'lbl'}" x="${x + w / 2}" y="${H - B + 14}" text-anchor="end" transform="rotate(-50 ${x + w / 2} ${H - B + 14})">${d.ma}</text></g>`; }).join('')}
    <line x1="${L}" x2="${W - R}" y1="${y(1)}" y2="${y(1)}" stroke="var(--crit)" stroke-width="1.5" stroke-dasharray="6 4"/>
    ${tp != null ? `<line x1="${L}" x2="${W - R}" y1="${y(tp)}" y2="${y(tp)}" stroke="var(--fg)" stroke-width="1.2" stroke-dasharray="2 4" opacity=".7"/>` : ''}
    <line x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}" stroke="var(--muted)" stroke-width="1"/>
  </svg></div>
  <div class="legend"><span><i style="background:var(--crit)"></i>Vượt hạn mức</span><span><i style="background:var(--warn)"></i>Từ 80%</span><span><i style="background:var(--ok)"></i>Bình thường</span><span><i style="background:var(--info)"></i>Dưới 10%</span>
    <span>Nét đứt đỏ: 100% hạn mức</span>${tp != null ? `<span>Nét chấm: thời gian HĐ đã qua (${pctf(tp)})</span>` : ''}</div>`;
}

/* ---------- Tổng quan (quản trị) ---------- */
function bangTinh(rs, clickable, me) {
  let L = rs;
  if (S.kv) L = L.filter(x => x.kv === S.kv);
  if (S.st) L = L.filter(x => x.st.k === S.st);
  const so = { pct: (a, b) => b.r - a.r, con: (a, b) => b.con - a.con, dk: (a, b) => b.dk - a.dk, tt: (a, b) => a.tt - b.tt };
  L = [...L].sort(so[S.sort]);
  const cnt = k => rs.filter(x => x.st.k === k).length;
  const chip = (k, t) => `<button class="chip k-${k}" data-act="st" data-v="${k}" aria-pressed="${S.st === k}">${t}: ${cnt(k)}</button>`;
  const tot = rs.reduce((a, x) => ({ hm: a.hm + x.hm, dk: a.dk + x.dk, cd: a.cd + x.cd, so: a.so + x.so }), { hm: 0, dk: 0, cd: 0, so: 0 });
  return `<div class="toolbar">
      <div class="chips">${chip('crit', 'Vượt hạn mức')}${chip('warn', 'Từ 80%')}${chip('info', 'Dưới 10%')}${chip('none', 'Chưa ký PO')}${chip('ok', 'Bình thường')}</div>
      <div class="g"><select id="fKv" data-f="kv" aria-label="Khu vực"><option value="">Tất cả khu vực</option>${['KV1', 'KV2', 'KV3'].map(k => `<option ${S.kv === k ? 'selected' : ''}>${k}</option>`).join('')}</select>
      <select id="fSort" data-f="sort" aria-label="Sắp xếp"><option value="pct" ${S.sort === 'pct' ? 'selected' : ''}>Tỷ lệ cao → thấp</option><option value="con" ${S.sort === 'con' ? 'selected' : ''}>Còn lại nhiều → ít</option><option value="dk" ${S.sort === 'dk' ? 'selected' : ''}>Đã ký nhiều → ít</option><option value="tt" ${S.sort === 'tt' ? 'selected' : ''}>Thứ tự tỉnh</option></select></div>
    </div>
    <div class="tbl"><table><thead><tr><th>Mã</th><th>Viettel tỉnh/TP</th><th>KV</th><th class="num">Hạn mức (đ)</th><th class="num">Đã ký PO (đ)</th><th class="num">Còn lại (đ)</th><th class="num">Số PO</th><th class="num">Chờ duyệt (đ)</th><th class="num">Tỷ lệ</th><th>Trạng thái</th></tr></thead>
    <tbody>${L.map(x => `<tr class="${clickable ? 'click' : ''} ${x.ma === me ? 'me' : ''}" ${clickable ? `data-act="xemTinh" data-v="${x.ma}"` : ''}>
      <td><b>${x.ma}</b></td><td>${esc(x.ten)}</td><td>${x.kv}</td><td class="num">${fmt(x.hm)}</td><td class="num">${fmt(x.dk)}</td>
      <td class="num" style="${x.con < 0 ? 'color:var(--crit);font-weight:600' : ''}">${fmt(x.con)}</td><td class="num">${x.so}</td><td class="num">${x.cd ? fmt(x.cd) : ''}</td>
      <td><div class="pct">${bar(x.dk, x.hm)}<span>${pctf(x.r)}</span></div></td><td><span class="pill k-${x.st.k}">${x.st.t}</span></td></tr>`).join('') || '<tr><td colspan="10" class="empty">Không có tỉnh nào khớp bộ lọc</td></tr>'}</tbody>
    <tfoot><tr><td colspan="3">Toàn quốc (34 tỉnh/TP)</td><td class="num">${fmt(tot.hm)}</td><td class="num">${fmt(tot.dk)}</td><td class="num">${fmt(tot.hm - tot.dk)}</td><td class="num">${tot.so}</td><td class="num">${fmt(tot.cd)}</td><td class="num">${tot.hm ? pctf(tot.dk / tot.hm) : ''}</td><td></td></tr></tfoot></table></div>`;
}
function tilesTQ(rs) {
  const hd = curHd(), hm = rs.reduce((a, x) => a + x.hm, 0), dk = rs.reduce((a, x) => a + x.dk, 0), cd = rs.reduce((a, x) => a + x.cd, 0);
  const so = rs.reduce((a, x) => a + x.so, 0), socho = rs.reduce((a, x) => a + x.socho, 0);
  return `<div class="tiles">
    <div class="tile"><span class="t">${ic('file')}Giá trị HĐ khung</span><span class="v">${ty(hd.gia_tri)}</span><span class="s">${fmt(hd.gia_tri)} đ</span></div>
    <div class="tile"><span class="t">${ic('gauge')}Hạn mức đã giao</span><span class="v">${ty(hm)}</span><span class="s">${hd.gia_tri ? pctf(hm / hd.gia_tri) : ''} giá trị HĐ</span></div>
    <div class="tile accent"><span class="t">${ic('receipt')}Đã ký PO</span><span class="v">${ty(dk)}</span><span class="s">${so} PO · ${hm ? pctf(dk / hm) : ''} hạn mức</span></div>
    <div class="tile"><span class="t">${ic('wallet')}Còn lại</span><span class="v">${ty(hm - dk)}</span><span class="s">Chưa giao: ${fmt(hd.gia_tri - hm)} đ</span></div>
    <div class="tile"><span class="t">${ic('inbox')}Chờ duyệt</span><span class="v">${socho} PO</span><span class="s">${fmt(cd)} đ</span></div>
  </div>`;
}
function vTongQuan() {
  const rs = rows();
  return tilesTQ(rs) + `<div class="card"><div class="card-h"><h2>Tỷ lệ sử dụng hạn mức theo tỉnh</h2><span class="muted small">Di chuột vào cột để xem số liệu</span></div>${chart(rs)}</div>` + bangTinh(rs, true);
}
function vToanQuoc() {
  const rs = rows();
  return tilesTQ(rs) + `<div class="card"><div class="card-h"><h2>Tỷ lệ sử dụng hạn mức theo tỉnh</h2><span class="muted small">Cột viền đậm là đơn vị mình</span></div>${chart(rs, S.user.tinh_ma)}</div>` + bangTinh(rs, false, S.user.tinh_ma);
}

/* ---------- Trang đơn vị (tỉnh) ---------- */
function vDonVi() {
  const me = rows().find(x => x.ma === S.user.tinh_ma) || { hm: 0, dk: 0, cd: 0, so: 0, socho: 0, qt: 0, con: 0, r: 0, st: stat(0, 0) };
  const hd = curHd(), mine = [...S.po].sort((a, b) => String(b.ngay_ky).localeCompare(String(a.ngay_ky)));
  const tc = mine.filter(p => p.trang_thai === 'tu_choi');
  return `<div class="tiles">
    <div class="tile"><span class="t">${ic('gauge')}Hạn mức được giao</span><span class="v">${fmt(me.hm)}</span><span class="s">${hd.pb ? esc(hd.pb.ten) : 'Chưa ban hành'}</span></div>
    <div class="tile accent"><span class="t">${ic('receipt')}Đã ký PO</span><span class="v">${fmt(me.dk)}</span><span class="s">${me.so} PO · ${pctf(me.r)}</span></div>
    <div class="tile"><span class="t">${ic('wallet')}Còn lại</span><span class="v" style="${me.con < 0 ? 'color:var(--crit)' : ''}">${fmt(me.con)}</span><span class="s"><span class="pill k-${me.st.k}">${me.st.t}</span></span></div>
    <div class="tile"><span class="t">${ic('inbox')}Chờ P.QLHT duyệt</span><span class="v">${me.socho} PO</span><span class="s">${fmt(me.cd)} đ</span></div>
    <div class="tile"><span class="t">${ic('coins')}Giá trị quyết toán</span><span class="v">${fmt(me.qt)}</span><span class="s">Trên các PO đã duyệt</span></div>
  </div>
  <div class="card stack"><div class="card-h" style="margin:0"><h2>Mức sử dụng hạn mức</h2><b class="num">${pctf(me.r)}</b></div>${bar(me.dk, me.hm, 'big-bar')}
    ${me.r >= 0.8 ? `<div class="note ${me.r >= 1 ? 'k-crit' : 'k-warn'}">${ic('alert')} ${me.r >= 1 ? 'Đơn vị đã vượt hạn mức. PO mới vẫn đăng ký được nhưng P.QLHT sẽ xem xét trước khi duyệt.' : 'Đơn vị đã dùng trên 80% hạn mức.'}</div>` : ''}</div>
  ${tc.length ? `<div class="card"><div class="card-h"><h2>PO bị từ chối, cần sửa và gửi lại</h2></div><div class="tbl"><table><tbody>${tc.map(p => `<tr class="click" data-act="xemPo" data-v="${p.id}"><td>${dmy(p.ngay_ky)}</td><td class="mono">${esc(p.so_po)}</td><td>${esc(p.ly_do_tu_choi)}</td><td class="num">${fmt(p.gt_gom_vat)}</td></tr>`).join('')}</tbody></table></div></div>` : ''}
  <div class="card"><div class="card-h"><h2>PO gần nhất</h2><div class="g" style="display:flex;gap:8px"><button class="btn sm" data-act="tab" data-v="po">${ic('list')}Xem tất cả ${mine.length} PO</button><button class="btn sm primary" data-act="tab" data-v="dangky">${ic('plus')}Đăng ký PO</button></div></div>
    ${mine.length ? `<div class="tbl"><table><thead><tr><th>Ngày ký</th><th>Số P/O</th><th>Nội dung</th><th class="num">Gồm VAT (đ)</th><th>Trạng thái</th></tr></thead><tbody>${mine.slice(0, 8).map(p => `<tr class="click" data-act="xemPo" data-v="${p.id}"><td>${dmy(p.ngay_ky)}</td><td class="mono">${esc(p.so_po)}</td><td><div class="nd">${esc(p.noi_dung)}</div></td><td class="num">${fmt(p.gt_gom_vat)}</td><td><span class="pill ${TT[p.trang_thai][0]}">${TT[p.trang_thai][1]}</span></td></tr>`).join('')}</tbody></table></div>` : `<div class="empty">Đơn vị chưa có PO trong HĐ này.</div>`}</div>`;
}

/* ---------- Danh sách PO ---------- */
function locPO() {
  let L = S.po;
  const f = S.f;
  if (f.tinh) L = L.filter(p => p.tinh_ma === f.tinh);
  if (f.tt) L = L.filter(p => p.trang_thai === f.tt);
  if (f.td) L = L.filter(p => p.tien_do === f.td);
  if (f.lct) L = L.filter(p => p.loai_ct === f.lct);
  if (f.q) { const q = f.q.toLowerCase(); L = L.filter(p => `${p.so_po} ${p.noi_dung} ${p.doi_tac} ${p.tinh_ma}`.toLowerCase().includes(q)); }
  return [...L].sort((a, b) => String(b.ngay_ky).localeCompare(String(a.ngay_ky)) || b.id - a.id);
}
function vPO() {
  const L = locPO(), shown = L.slice(0, S.lim), tot = L.reduce((a, p) => a + Number(p.gt_gom_vat), 0), qt = L.reduce((a, p) => a + Number(p.gt_quyet_toan || 0), 0);
  const tinhs = [...new Set(S.th.map(x => x.tinh_ma))];
  const lcts = [...new Set(S.po.map(p => p.loai_ct).filter(Boolean))];
  return `<div class="toolbar"><div class="g">
      <input type="search" id="fQ" data-f="q" placeholder="Tìm số P/O, nội dung, đối tác…" value="${esc(S.f.q)}" style="width:250px" aria-label="Tìm kiếm">
      ${isQT() ? `<select id="fTinh" data-f="tinh" aria-label="Tỉnh"><option value="">Tất cả tỉnh</option>${S.th.map(x => `<option value="${x.tinh_ma}" ${S.f.tinh === x.tinh_ma ? 'selected' : ''}>${x.tinh_ma} – ${esc(x.ten)}</option>`).join('')}</select>` : ''}
      <select id="fTt" data-f="tt" aria-label="Trạng thái"><option value="">Mọi trạng thái</option>${Object.entries(TT).map(([k, v]) => `<option value="${k}" ${S.f.tt === k ? 'selected' : ''}>${v[1]}</option>`).join('')}</select>
      <select id="fTd" data-f="td" aria-label="Tiến độ"><option value="">Mọi tiến độ</option>${TIEN_DO.map(t => `<option ${S.f.td === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
      ${lcts.length > 1 ? `<select id="fLct" data-f="lct" aria-label="Loại công trình"><option value="">Mọi loại CT</option>${lcts.map(t => `<option ${S.f.lct === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>` : ''}
    </div><div class="g"><span class="muted small">${L.length} PO · <b style="color:var(--fg)" class="num">${fmt(tot)} đ</b>${qt ? ` · QT ${fmt(qt)} đ` : ''}</span>
      <button class="btn sm primary" data-act="tab" data-v="dangky">${ic('plus')}${isQT() ? 'Nhập PO' : 'Đăng ký PO'}</button></div></div>
  <div class="tbl"><table><thead><tr><th>Ngày ký</th>${isQT() ? '<th>Tỉnh</th>' : ''}<th>Số P/O</th><th>Nội dung</th><th class="num">Chưa VAT (đ)</th><th class="num">Gồm VAT (đ)</th><th class="num">Quyết toán (đ)</th><th>Tiến độ</th><th>Trạng thái</th></tr></thead>
  <tbody>${shown.map(p => `<tr class="click" data-act="xemPo" data-v="${p.id}"><td style="white-space:nowrap">${dmy(p.ngay_ky)}</td>${isQT() ? `<td><b>${p.tinh_ma}</b></td>` : ''}
    <td class="mono" style="max-width:230px;overflow-wrap:anywhere">${esc(p.so_po)}</td><td><div class="nd">${esc(p.noi_dung)}</div></td>
    <td class="num">${fmt(p.gt_truoc_vat)}</td><td class="num"><b>${fmt(p.gt_gom_vat)}</b></td><td class="num">${fmt(p.gt_quyet_toan)}</td>
    <td style="white-space:nowrap">${esc(p.tien_do)}</td><td><span class="pill ${TT[p.trang_thai][0]}">${TT[p.trang_thai][1]}</span></td></tr>`).join('') || `<tr><td colspan="9" class="empty">Không có PO khớp bộ lọc</td></tr>`}</tbody></table></div>
  ${L.length > S.lim ? `<div style="text-align:center"><button class="btn" data-act="more">Xem thêm ${Math.min(80, L.length - S.lim)} PO</button></div>` : ''}`;
}

/* ---------- Chờ duyệt ---------- */
function vDuyet() {
  const L = S.po.filter(p => p.trang_thai === 'cho_duyet').sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  if (!L.length) return `<div class="card empty">${ic('check')}<div>Không có PO nào đang chờ duyệt.</div></div>`;
  const rs = Object.fromEntries(rows().map(x => [x.ma, x]));
  return `<div class="toolbar"><span class="muted small">Sắp theo thời gian gửi. Nhãn tuổi vàng từ 3 ngày, đỏ từ 7 ngày.</span>
    <div class="g"><button class="btn sm ok" data-act="duyetChon" ${S.sel.size ? '' : 'disabled'}>${ic('check')}Duyệt ${S.sel.size || ''} PO đã chọn</button></div></div>
  <div class="tbl"><table><thead><tr><th><input type="checkbox" id="selAll" aria-label="Chọn tất cả" ${S.sel.size === L.length ? 'checked' : ''}></th><th>Gửi lúc</th><th>Tỉnh</th><th>Số P/O</th><th>Nội dung</th><th class="num">Gồm VAT (đ)</th><th class="num">Tỷ lệ sau duyệt</th><th></th></tr></thead>
  <tbody>${L.map(p => { const x = rs[p.tinh_ma], age = Math.floor((Date.now() - new Date(p.created_at)) / 864e5), ak = age >= 7 ? 'k-crit' : age >= 3 ? 'k-warn' : 'k-none';
    const after = x ? (x.dk + Number(p.gt_gom_vat)) : 0;
    return `<tr><td><input type="checkbox" data-sel="${p.id}" ${S.sel.has(p.id) ? 'checked' : ''} aria-label="Chọn PO ${esc(p.so_po)}"></td>
      <td style="white-space:nowrap">${dmyhm(p.created_at)}<br><span class="pill ${ak}">${age} ngày</span></td><td><b>${p.tinh_ma}</b></td>
      <td class="mono" style="max-width:220px;overflow-wrap:anywhere">${esc(p.so_po)}</td><td><div class="nd">${esc(p.noi_dung)}</div><span class="muted small">${esc(p.nguoi_tao || '')}</span></td>
      <td class="num"><b>${fmt(p.gt_gom_vat)}</b></td><td><div class="pct">${x ? bar(after, x.hm) : ''}<span>${x && x.hm ? pctf(after / x.hm) : '—'}</span></div></td>
      <td><button class="btn sm" data-act="xemPo" data-v="${p.id}">Xem / duyệt</button></td></tr>`; }).join('')}</tbody></table></div>`;
}

/* ---------- Đăng ký / nhập PO ---------- */
function blankForm() { return { tinh: isQT() ? (S.f.tinh || '') : S.user.tinh_ma, so_po: '', ngay_ky: '', loai_ct: (LOAI_CT[S.loai] || ['Khác'])[0], doi_tac: '', noi_dung: '', gt: '', vatp: '8', vat: '', sl: '', nguoi: '' }; }
function vDangKy() {
  const hd = curHd(), dangTH = S.hds.filter(h => h.trang_thai === 'dang_thuc_hien');
  const chonHd = `<div class="card stack hdpick"><div class="row" style="align-items:end">
      <div class="fg" style="flex:2"><label for="d_hd">Bước 1 – Chọn hợp đồng khung (VTNet đã ký)</label>
        <select id="d_hd" data-f="hdDk">${dangTH.length ? '' : '<option value="">Không có HĐ khung đang thực hiện</option>'}${dangTH.map(h => `<option value="${h.id}" ${h.id === S.hdId ? 'selected' : ''}>${esc(nhanHd(h))}</option>`).join('')}</select></div>
      <div class="fg" style="flex:1"><label>&nbsp;</label><div class="btns-imp">
        <button type="button" class="btn" data-act="mauExcel" ${hd && hd.trang_thai === 'dang_thuc_hien' ? '' : 'disabled'}>${ic('download')}Tải file mẫu Excel</button>
        <button type="button" class="btn primary" data-act="nhapExcel" ${hd && hd.trang_thai === 'dang_thuc_hien' ? '' : 'disabled'}>${ic('upload')}Nhập nhiều PO từ Excel</button>
        <input type="file" id="f_excel" accept=".xlsx" hidden></div></div></div>
    ${hd ? `<div class="small muted">Đối tác: <b>${esc(dsDoiTac(hd).join('; ') || '—')}</b> · Hiệu lực: <b>${dmy(hd.ngay_ky) || '—'}</b> – <b>${dmy(hd.ngay_het_han) || 'chưa nhập'}</b> · Hạn mức: <b>${hd.pb ? esc(hd.pb.ten) : 'chưa ban hành'}</b></div>` : ''}</div>`;
  if (!hd || hd.trang_thai !== 'dang_thuc_hien') return chonHd + `<div class="card empty">HĐ khung đang chọn đã kết thúc, không nhận P/O mới. Chọn HĐ khung đang thực hiện ở trên.</div>`;
  if (!S.form) S.form = blankForm();
  const f = S.form, dts = dsDoiTac(hd);
  return chonHd + `<div class="form-grid">
  <form class="card stack" id="poForm" novalidate>
    <h2>${isQT() ? 'Bước 2 – Nhập PO (P.QLHT nhập trực tiếp, ghi nhận ngay)' : 'Bước 2 – Đăng ký PO đã ký với đối tác'}</h2>
    <div class="row">
      ${isQT() ? `<div class="fg"><label for="d_tinh">Viettel tỉnh/TP</label><select id="d_tinh" name="tinh" required><option value="">– Chọn tỉnh –</option>${S.th.map(x => `<option value="${x.tinh_ma}" ${f.tinh === x.tinh_ma ? 'selected' : ''}>${x.tinh_ma} – ${esc(x.ten)}</option>`).join('')}</select></div>` : ''}
      <div class="fg"><label for="d_ngay">Ngày ký P/O</label><input type="date" id="d_ngay" name="ngay_ky" value="${esc(f.ngay_ky)}" min="${hd.ngay_ky || ''}" max="${today()}" required></div>
      <div class="fg"><label for="d_lct">Loại công trình</label><select id="d_lct" name="loai_ct">${(LOAI_CT[S.loai] || ['Khác']).map(t => `<option ${f.loai_ct === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
    </div>
    <div class="fg"><label for="d_so">Số P/O</label><input type="text" id="d_so" name="so_po" value="${esc(f.so_po)}" autocomplete="off" required placeholder="VD: 071001-${esc(hd.so_hd.split('-')[0])}/Viettel ${esc(isQT() ? 'XXX' : S.user.tinh_ma)}-VCC/PTV${hd.nam}"></div>
    <div class="fg"><label for="d_dt">Đối tác (thuộc HĐ khung)</label><select id="d_dt" name="doi_tac" required><option value="">– Chọn đối tác –</option>${dts.map(d => `<option ${f.doi_tac === d ? 'selected' : ''}>${esc(d)}</option>`).join('')}</select></div>
    <div class="fg"><label for="d_nd">Nội dung P/O</label><textarea id="d_nd" name="noi_dung" rows="3" placeholder="Bổ sung tài nguyên phục vụ… theo Kế hoạch số …">${esc(f.noi_dung)}</textarea></div>
    <div class="row">
      <div class="fg"><label for="d_gt">Giá trị chưa VAT (đ)</label><input type="text" inputmode="numeric" id="d_gt" name="gt" value="${f.gt ? fmt(digits(f.gt)) : ''}" placeholder="0"></div>
      <div class="fg"><label for="d_vatp">Thuế suất VAT</label><select id="d_vatp" name="vatp">${['8', '10', '0', 'khac'].map(v => `<option value="${v}" ${f.vatp === v ? 'selected' : ''}>${v === 'khac' ? 'Nhập tay' : v + '%'}</option>`).join('')}</select></div>
      <div class="fg"><label for="d_vat">Tiền thuế VAT (đ)</label><input type="text" inputmode="numeric" id="d_vat" name="vat" value="${f.vat ? fmt(digits(f.vat)) : ''}" ${f.vatp === 'khac' ? '' : 'readonly'}></div>
    </div>
    <div class="row">
      <div class="fg"><label for="d_sl">Số lượng trạm/tuyến</label><input type="number" min="0" id="d_sl" name="sl" value="${esc(f.sl)}"></div>
      <div class="fg"><label for="d_ng">Người nhập (họ tên, SĐT)</label><input type="text" id="d_ng" name="nguoi" value="${esc(f.nguoi)}" placeholder="Nguyễn Văn A – 09xx"></div>
    </div>
    <div class="sumline" id="d_sum"></div>
    <div class="actions"><button type="button" class="btn" data-act="xoaForm">Xóa form</button><button type="submit" class="btn primary" id="d_submit">${ic('check')}Gửi</button></div>
  </form>
  <aside class="card stack" id="d_check" aria-live="polite"></aside></div>`;
}
function docForm() {
  const g = id => $('#' + id);
  const f = S.form;
  if (isQT()) f.tinh = g('d_tinh').value;
  Object.assign(f, { ngay_ky: g('d_ngay').value, loai_ct: g('d_lct').value, so_po: g('d_so').value, doi_tac: g('d_dt').value, noi_dung: g('d_nd').value, gt: g('d_gt').value, vatp: g('d_vatp').value, sl: g('d_sl').value, nguoi: g('d_ng').value });
  if (f.vatp === 'khac') { f.vat = g('d_vat').value; g('d_vat').readOnly = false; }
  else { f.vat = String(Math.round(digits(f.gt) * Number(f.vatp) / 100)); g('d_vat').value = digits(f.gt) ? fmt(f.vat) : ''; g('d_vat').readOnly = true; }
}
function kiemTraForm() {
  const f = S.form, hd = curHd(), gt = digits(f.gt), vat = digits(f.vat), tong = gt + vat;
  const x = rows().find(r => r.ma === f.tinh);
  const so = f.so_po.trim().toLowerCase();
  const dup = so && S.po.some(p => p.tinh_ma === f.tinh && p.trang_thai !== 'tu_choi' && p.so_po.trim().toLowerCase() === so);
  const it = [];
  const add = (l, t) => it.push([l, t]);
  const thieu = [isQT() && !f.tinh && 'tỉnh', !f.so_po.trim() && 'số P/O', !f.ngay_ky && 'ngày ký', !f.doi_tac && 'đối tác', !f.noi_dung.trim() && 'nội dung', !gt && 'giá trị'].filter(Boolean);
  add(thieu.length ? 'err' : 'ok', thieu.length ? 'Còn thiếu: ' + thieu.join(', ') : 'Đủ thông tin bắt buộc');
  if (so) add(dup ? 'err' : 'ok', dup ? 'Số P/O này đã có trên hệ thống' : 'Số P/O chưa từng đăng ký');
  if (f.ngay_ky) { const ok = (!hd.ngay_ky || f.ngay_ky >= hd.ngay_ky) && (!hd.ngay_het_han || f.ngay_ky <= hd.ngay_het_han) && f.ngay_ky <= today(); add(ok ? 'ok' : 'err', ok ? 'Ngày ký nằm trong hiệu lực HĐ khung' : 'Ngày ký ngoài hiệu lực HĐ khung hoặc sau hôm nay'); }
  if (gt) add(f.vatp === '8' || f.vatp === '10' ? 'ok' : 'warn', f.vatp === 'khac' ? 'VAT nhập tay: kiểm tra lại với hóa đơn' : `VAT ${f.vatp}%`);
  let after = 0;
  if (x && gt) { after = x.dk + x.cd + tong; add(after > x.hm ? 'warn' : 'ok', after > x.hm ? `Vượt hạn mức ${fmt(after - x.hm)} đ: vẫn gửi được, P.QLHT xem xét khi duyệt` : 'Nằm trong hạn mức còn lại'); }
  return { it, err: it.some(i => i[0] === 'err'), warn: it.some(i => i[0] === 'warn'), x, tong, gt, vat, after };
}
function veKiemTra() {
  const k = kiemTraForm(), dd = { ok: ['k-ok', '✓'], warn: ['k-warn', '!'], err: ['k-crit', '×'] };
  $('#d_sum').innerHTML = `<span>Chưa VAT: <b>${fmt(k.gt)}</b> đ</span><span>VAT: <b>${fmt(k.vat)}</b> đ</span><span>Gồm VAT: <b>${fmt(k.tong)}</b> đ</span>`;
  $('#d_check').innerHTML = `<h2>Kiểm tra tự động</h2>${k.it.map(i => `<div class="ck"><span class="d ${dd[i[0]][0]}">${dd[i[0]][1]}</span><span>${esc(i[1])}</span></div>`).join('')}
    ${k.x ? `<div class="stack" style="gap:6px"><div class="eyebrow">Hạn mức ${k.x.ma}: ${fmt(k.x.hm)} đ</div>
      <span class="small">Hiện tại (gồm chờ duyệt): <b>${k.x.hm ? pctf((k.x.dk + k.x.cd) / k.x.hm) : '—'}</b></span>${bar(k.x.dk + k.x.cd, k.x.hm, 'big-bar')}
      ${k.gt ? `<span class="small">Sau PO này: <b>${k.x.hm ? pctf(k.after / k.x.hm) : '—'}</b></span>${bar(k.after, k.x.hm, 'big-bar')}` : ''}</div>` : ''}
    <div class="note ${k.err ? 'k-crit' : k.warn ? 'k-warn' : 'k-ok'}">${k.err ? 'Chưa gửi được: sửa các mục đánh dấu ×.' : isQT() ? 'PO do P.QLHT nhập được ghi nhận ngay (đã duyệt).' : 'PO sẽ chuyển P.QLHT duyệt; hệ thống gửi email thông báo.'}</div>`;
  const b = $('#d_submit'); b.disabled = k.err; b.innerHTML = ic('check') + (isQT() ? 'Ghi nhận PO' : 'Gửi đăng ký');
}
async function guiForm() {
  docForm(); const k = kiemTraForm(); if (k.err) return;
  const f = S.form;
  const p = { tinh_ma: f.tinh, so_po: f.so_po.trim(), ngay_ky: f.ngay_ky, loai_ct: f.loai_ct, doi_tac: f.doi_tac.trim(), noi_dung: f.noi_dung.trim(), gt_truoc_vat: k.gt, vat: k.vat, so_luong: f.sl || '', nguoi_tao: f.nguoi.trim() };
  await chay(async () => { await rpc('dang_ky_po', { p_hd: S.hdId, p }); }, isQT() ? 'Đã ghi nhận PO' : 'Đã gửi đăng ký PO, chờ P.QLHT duyệt');
  S.form = null; S.tab = 'po'; await lamMoi();
}

/* ---------- Nhập nhiều PO từ Excel ---------- */
const COT_EXCEL = [
  ['tinh', 'Mã tỉnh *', 10], ['so_po', 'Số P/O *', 40], ['ngay_ky', 'Ngày ký P/O *\n(dd/mm/yyyy)', 14], ['loai_ct', 'Loại công trình', 14],
  ['doi_tac', 'Đối tác *', 38], ['noi_dung', 'Nội dung P/O *', 52], ['gt', 'Giá trị chưa VAT (đ) *', 18], ['vatp', 'Thuế suất VAT (%)', 11],
  ['vat', 'Tiền thuế VAT (đ)\n(để trống: tự tính)', 18], ['sl', 'Số lượng trạm/tuyến', 12], ['nguoi', 'Người nhập (họ tên, SĐT)', 26]];
const boDau = t => String(t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, ' ').trim();
const KHOA_COT = [['ma tinh', 'tinh'], ['so p/o', 'so_po'], ['so po', 'so_po'], ['ngay ky', 'ngay_ky'], ['loai cong trinh', 'loai_ct'], ['doi tac', 'doi_tac'], ['noi dung', 'noi_dung'],
  ['gia tri chua vat', 'gt'], ['thue suat', 'vatp'], ['tien thue', 'vat'], ['so luong', 'sl'], ['nguoi nhap', 'nguoi']];
const tenFileNgay = () => { const d = new Date(); return String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear(); };
function taiFile(buf, name) {
  const url = URL.createObjectURL(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
}
async function taiMauExcel() {
  if (!window.ExcelJS) throw new Error('Chưa tải được thư viện Excel, kiểm tra kết nối mạng');
  const hd = curHd(), qt = isQT(), cols = COT_EXCEL.filter(c => qt || c[0] !== 'tinh'), N = 300;
  const wb = new ExcelJS.Workbook(); wb.creator = 'PO Manager – P.QLHT';
  const ws = wb.addWorksheet('Dang_ky_PO', { views: [{ state: 'frozen', ySplit: 4 }] });
  const F = { name: 'Times New Roman', size: 12 }, bd = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  ws.columns = [{ width: 6 }, ...cols.map(c => ({ width: c[2] }))];
  const L = ws.columnCount, last = String.fromCharCode(64 + L);
  ws.mergeCells(`A1:${last}1`); ws.getCell('A1').value = `MẪU ĐĂNG KÝ PO – HĐ KHUNG ${LOAI[hd.loai].ten.toUpperCase()} NĂM ${hd.nam}${qt ? '' : ' – VIETTEL ' + S.user.tinh_ten.toUpperCase()}`;
  ws.getCell('A1').font = { ...F, size: 14, bold: true }; ws.getCell('A1').alignment = { horizontal: 'center' };
  ws.mergeCells(`A2:${last}2`); ws.getCell('A2').value = 'Số HĐ khung: ' + hd.so_hd; ws.getCell('A2').font = { ...F, bold: true, color: { argb: 'FFC00000' } }; ws.getCell('A2').alignment = { horizontal: 'center' };
  ws.mergeCells(`A3:${last}3`); ws.getCell('A3').value = 'Cột có dấu * bắt buộc. Ngày ký dạng dd/mm/yyyy. Giá trị nhập số (đồng). Đối tác, loại công trình chọn trong danh sách. Không sửa dòng 1–4.';
  ws.getCell('A3').font = { ...F, italic: true, size: 11 }; ws.getCell('A3').alignment = { horizontal: 'center', wrapText: true }; ws.getRow(3).height = 30;
  const hr = ws.getRow(4); ['STT', ...cols.map(c => c[1])].forEach((t, i) => { const c = hr.getCell(i + 1); c.value = t; c.font = { ...F, bold: true, color: { argb: 'FFFFFFFF' } }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC8102E' } }; c.border = bd; c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; });
  hr.height = 42;
  const dm = wb.addWorksheet('DM', { state: 'hidden' });
  const dts = dsDoiTac(hd), lcts = LOAI_CT[hd.loai] || ['Khác'], tinhs = S.th.map(x => x.tinh_ma);
  dm.getColumn(1).values = ['Đối tác', ...dts]; dm.getColumn(2).values = ['Loại CT', ...lcts]; dm.getColumn(3).values = ['Mã tỉnh', ...tinhs];
  const colOf = k => 2 + cols.findIndex(c => c[0] === k);
  for (let r = 5; r < 5 + N; r++) {
    const row = ws.getRow(r);
    row.getCell(1).value = { formula: `IF(${String.fromCharCode(64 + colOf('so_po'))}${r}="","",ROW()-4)` };
    for (let j = 1; j <= L; j++) { const c = row.getCell(j); c.border = bd; c.font = F; c.alignment = { vertical: 'top', wrapText: j === colOf('noi_dung') }; }
    row.getCell(colOf('ngay_ky')).numFmt = 'dd/mm/yyyy';
    ['gt', 'vat'].forEach(k => row.getCell(colOf(k)).numFmt = '#,##0');
    const dv = (k, f) => { row.getCell(colOf(k)).dataValidation = { type: 'list', allowBlank: true, showErrorMessage: true, errorTitle: 'Giá trị không hợp lệ', error: 'Chọn trong danh sách', formulae: [f] }; };
    dv('doi_tac', `DM!$A$2:$A$${1 + dts.length}`); dv('loai_ct', `DM!$B$2:$B$${1 + lcts.length}`); dv('vatp', '"8,10,0"');
    if (qt) dv('tinh', `DM!$C$2:$C$${1 + tinhs.length}`);
    row.getCell(colOf('ngay_ky')).dataValidation = { type: 'date', operator: 'between', allowBlank: true, showErrorMessage: true, error: 'Nhập ngày dạng dd/mm/yyyy, trong thời gian hiệu lực HĐ khung',
      formulae: [new Date((hd.ngay_ky || '2020-01-01') + 'T00:00:00Z'), new Date((hd.ngay_het_han || (hd.nam + 1) + '-12-31') + 'T00:00:00Z')] };
  }
  const hdn = wb.addWorksheet('Huong_dan'); hdn.columns = [{ width: 110 }];
  ['HƯỚNG DẪN ĐĂNG KÝ NHIỀU PO BẰNG FILE EXCEL', '',
   '1. Mỗi dòng ở sheet Dang_ky_PO là 1 PO đã ký với đối tác. Nhập từ dòng 5; tối đa ' + N + ' dòng/lần.',
   '2. Số P/O: ghi đúng số trên PO đã ký. Ngày ký: dd/mm/yyyy, trong thời gian hiệu lực HĐ khung và không sau ngày nhập.',
   '3. Đối tác: chọn trong danh sách (' + dts.join('; ') + ').',
   '4. Giá trị chưa VAT: số đồng, không nhập chữ. Thuế suất mặc định 8%; Tiền thuế VAT để trống thì phần mềm tự tính = Giá trị chưa VAT × thuế suất.',
   qt ? '5. Mã tỉnh: chọn mã Viettel tỉnh/TP (HNI, HCM…).' : '5. File chỉ dùng cho đơn vị đã tải mẫu; không đăng ký PO của đơn vị khác.',
   '6. Trên phần mềm: mục ' + (qt ? '"Nhập PO"' : '"Đăng ký PO"') + ' → chọn đúng HĐ khung → "Nhập nhiều PO từ Excel" → chọn file → xem kết quả kiểm tra → bấm gửi. Dòng lỗi không được gửi, sửa trong file rồi nhập lại.',
   '7. Không đổi tên sheet, không thêm/xóa cột, không sửa dòng tiêu đề.']
    .forEach((t, i) => { const c = hdn.getCell(i + 1, 1); c.value = t; c.font = { ...F, bold: i === 0, size: i === 0 ? 14 : 12 }; c.alignment = { wrapText: true }; });
  wb.views = [{ activeTab: 0 }];
  taiFile(await wb.xlsx.writeBuffer(), `Mẫu đăng ký PO – HĐ ${LOAI[hd.loai].ngan} ${hd.nam}${qt ? '' : ' – ' + S.user.tinh_ma}.xlsx`);
  toast('Đã tải file mẫu');
}
function giaTriO(v) {
  if (v == null) return '';
  if (v instanceof Date) return v;
  if (typeof v === 'object') { if (v.richText) return v.richText.map(t => t.text).join(''); if ('result' in v) return giaTriO(v.result); if (v.text != null) return giaTriO(v.text); if (v.error) return ''; }
  return v;
}
function ngayExcel(v) {
  const p2 = n => String(n).padStart(2, '0');
  if (v instanceof Date && !isNaN(v)) return `${v.getUTCFullYear()}-${p2(v.getUTCMonth() + 1)}-${p2(v.getUTCDate())}`;
  if (typeof v === 'number' && v > 20000 && v < 80000) { const d = new Date(Math.round((v - 25569) * 86400000)); return `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())}`; }
  const t = String(v).trim(); let m;
  if ((m = t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/))) { const d = new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])); if (d.getUTCDate() === +m[1] && d.getUTCMonth() === +m[2] - 1) return `${m[3]}-${p2(m[2])}-${p2(m[1])}`; }
  if ((m = t.match(/^(\d{4})-(\d{2})-(\d{2})/))) return `${m[1]}-${m[2]}-${m[3]}`;
  return null;
}
const soExcel = v => typeof v === 'number' ? Math.round(v) : digits(v);
async function docExcelPo(file) {
  if (!window.ExcelJS) throw new Error('Chưa tải được thư viện Excel, kiểm tra kết nối mạng');
  const hd = curHd(), qt = isQT();
  const wb = new ExcelJS.Workbook();
  try { await wb.xlsx.load(await file.arrayBuffer()); } catch (e) { throw new Error('Không đọc được file. Dùng file .xlsx theo mẫu tải từ phần mềm.'); }
  const ws = wb.getWorksheet('Dang_ky_PO') || wb.worksheets[0];
  let hRow = 0; const map = {};
  for (let r = 1; r <= 12 && !hRow; r++) {
    const row = ws.getRow(r); const tmp = {};
    row.eachCell((c, j) => { const t = boDau(giaTriO(c.value)); const k = KHOA_COT.find(([p]) => t.startsWith(p)); if (k && !tmp[k[1]]) tmp[k[1]] = j; });
    if (tmp.so_po && tmp.gt) { hRow = r; Object.assign(map, tmp); }
  }
  if (!hRow) throw new Error('Không tìm thấy dòng tiêu đề (Số P/O, Giá trị chưa VAT…). Dùng đúng file mẫu.');
  const nhan = String(giaTriO(ws.getCell('A2').value) || '');
  if (/so hd khung/.test(boDau(nhan)) && !nhan.includes(hd.so_hd)) throw new Error(`File mẫu thuộc HĐ khác (${nhan.replace(/^.*?:\s*/, '')}). Chọn đúng HĐ khung ở Bước 1 hoặc tải lại file mẫu.`);
  if (qt && !map.tinh) throw new Error('File thiếu cột "Mã tỉnh". Quản trị dùng file mẫu tải từ tài khoản PQLHT.');
  const dts = dsDoiTac(hd), dtKey = Object.fromEntries(dts.map(d => [boDau(d), d])), lcts = LOAI_CT[hd.loai] || ['Khác'];
  const R = rows(), dung = {}, trongFile = new Set(), out = [];
  for (let r = hRow + 1; r <= ws.rowCount; r++) {
    const row = ws.getRow(r), g = k => map[k] ? giaTriO(row.getCell(map[k]).value) : '';
    const raw = { tinh: g('tinh'), so_po: String(g('so_po')).trim(), ngay: g('ngay_ky'), loai_ct: String(g('loai_ct')).trim(), doi_tac: String(g('doi_tac')).trim(),
      noi_dung: String(g('noi_dung')).trim(), gt: g('gt'), vatp: g('vatp'), vat: g('vat'), sl: g('sl'), nguoi: String(g('nguoi')).trim() };
    if (!raw.so_po && !raw.noi_dung && !raw.gt && !raw.doi_tac && !raw.ngay) continue;
    if (out.length >= 300) throw new Error('File có quá 300 PO. Chia thành nhiều file.');
    const loi = [], canh = [];
    const tinh = qt ? String(raw.tinh).trim().toUpperCase() : S.user.tinh_ma;
    if (qt && !tinh) loi.push('thiếu mã tỉnh'); else if (qt && !S.th.some(x => x.tinh_ma === tinh)) loi.push(`mã tỉnh "${tinh}" không đúng`);
    if (!qt && raw.tinh && String(raw.tinh).trim().toUpperCase() !== tinh) loi.push('mã tỉnh khác đơn vị');
    if (!raw.so_po) loi.push('thiếu số P/O');
    const ngay = raw.ngay === '' ? null : ngayExcel(raw.ngay);
    if (raw.ngay === '') loi.push('thiếu ngày ký'); else if (!ngay) loi.push('ngày ký sai định dạng dd/mm/yyyy');
    else if ((hd.ngay_ky && ngay < hd.ngay_ky) || (hd.ngay_het_han && ngay > hd.ngay_het_han) || ngay > today()) loi.push('ngày ký ngoài hiệu lực HĐ hoặc sau hôm nay');
    const dt = dtKey[boDau(raw.doi_tac)];
    if (!raw.doi_tac) loi.push('thiếu đối tác'); else if (!dt) loi.push(`đối tác "${raw.doi_tac}" không thuộc HĐ khung`);
    if (!raw.noi_dung) loi.push('thiếu nội dung');
    const gt = soExcel(raw.gt); if (!gt) loi.push('thiếu/sai giá trị chưa VAT');
    let vp = raw.vatp === '' ? 8 : (typeof raw.vatp === 'number' ? (raw.vatp > 0 && raw.vatp < 1 ? raw.vatp * 100 : raw.vatp) : Number(String(raw.vatp).replace('%', '').replace(',', '.')));
    if (!isFinite(vp)) { loi.push('thuế suất VAT không đúng'); vp = 8; }
    const vat = raw.vat === '' ? Math.round(gt * vp / 100) : soExcel(raw.vat);
    if (![8, 10, 0].includes(Math.round(vp * 100) / 100)) canh.push(`VAT ${vp}%`);
    if (raw.vat !== '' && gt && Math.abs(vat - Math.round(gt * vp / 100)) > 1000) canh.push('tiền thuế lệch với thuế suất');
    const loai_ct = raw.loai_ct ? (lcts.find(t => boDau(t) === boDau(raw.loai_ct)) || raw.loai_ct) : lcts[0];
    const khoa = tinh + '|' + raw.so_po.toLowerCase();
    if (raw.so_po && S.po.some(p => p.tinh_ma === tinh && p.trang_thai !== 'tu_choi' && p.so_po.trim().toLowerCase() === raw.so_po.toLowerCase())) loi.push('số P/O đã có trên hệ thống');
    else if (raw.so_po && trongFile.has(khoa)) loi.push('số P/O trùng trong file');
    trongFile.add(khoa);
    const tong = gt + vat, x = R.find(y => y.ma === tinh);
    if (!loi.length && x) { dung[tinh] = (dung[tinh] || 0) + tong; if (x.dk + x.cd + dung[tinh] > x.hm) canh.push('vượt hạn mức (P.QLHT xem xét khi duyệt)'); }
    out.push({ dong: r, tinh, loi, canh, tong, p: { tinh_ma: tinh, so_po: raw.so_po, ngay_ky: ngay, loai_ct, doi_tac: dt || raw.doi_tac, noi_dung: raw.noi_dung,
      gt_truoc_vat: gt, vat, so_luong: raw.sl === '' ? '' : String(soExcel(raw.sl)), nguoi_tao: raw.nguoi, nguon: 'excel' } });
  }
  if (!out.length) throw new Error('File chưa có dòng PO nào (nhập từ dòng 5).');
  S.imp = { hd: S.hdId, ds: out, ten: file.name };
  veNhapExcel();
}
function veNhapExcel(kq) {
  const I = S.imp, ok = I.ds.filter(x => !x.loi.length), bad = I.ds.length - ok.length, qt = isQT();
  const tongOk = ok.reduce((a, x) => a + x.tong, 0);
  openModal(`<div class="mh"><div><h2>Nhập PO từ Excel</h2><div class="small muted">${esc(I.ten)} · ${esc(nhanHd(curHd()))}</div></div>${kq && kq.dang ? '' : `<button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button>`}</div>
  <div class="mb">
    <div class="imp-sum"><span>Tổng: <b>${I.ds.length}</b> dòng</span><span class="pill k-ok">Hợp lệ: ${ok.length}</span>${bad ? `<span class="pill k-crit">Lỗi: ${bad} (không gửi)</span>` : ''}<span>Giá trị hợp lệ gồm VAT: <b>${fmt(tongOk)} đ</b></span></div>
    ${kq ? `<div class="note ${kq.loi.length ? 'k-warn' : 'k-ok'}">${kq.dang ? `Đang gửi ${kq.xong}/${kq.tong} PO…` : `Đã ${qt ? 'ghi nhận' : 'gửi đăng ký'} <b>${kq.thanh}</b>/${kq.tong} PO${qt ? '' : ', chờ P.QLHT duyệt'}.`}
      ${kq.loi.length ? '<br>' + kq.loi.map(l => `Dòng ${l.dong} (${esc(l.so)}): ${esc(l.msg)}`).join('<br>') : ''}</div>` : ''}
    <div class="tbl imp-tbl"><table><thead><tr><th>Dòng</th>${qt ? '<th>Tỉnh</th>' : ''}<th>Số P/O</th><th>Ngày ký</th><th>Đối tác</th><th>Nội dung</th><th class="num">Gồm VAT (đ)</th><th>Kiểm tra</th></tr></thead>
    <tbody>${I.ds.map(x => `<tr class="${x.loi.length ? 'bad' : x.canh.length ? 'warnr' : ''}"><td>${x.dong}</td>${qt ? `<td>${esc(x.tinh)}</td>` : ''}<td class="mono" style="font-size:12.5px">${esc(x.p.so_po)}</td><td>${dmy(x.p.ngay_ky)}</td>
      <td>${esc(x.p.doi_tac)}</td><td><div class="nd">${esc(x.p.noi_dung)}</div></td><td class="num">${fmt(x.tong)}</td>
      <td class="msg">${x.loi.length ? '<b style="color:var(--crit)">Lỗi:</b> ' + esc(x.loi.join('; ')) : '<span style="color:var(--ok)">✓ Hợp lệ</span>'}${x.canh.length ? '<br><span style="color:var(--warn)">Lưu ý: ' + esc(x.canh.join('; ')) + '</span>' : ''}</td></tr>`).join('')}</tbody></table></div>
  </div>
  <div class="mf">${kq && !kq.dang ? `<button class="btn primary" data-act="closeModal">Đóng</button>` : `<button class="btn" data-act="closeModal" ${kq ? 'disabled' : ''}>Hủy</button>
    <button class="btn primary" data-act="guiExcel" ${ok.length && !kq ? '' : 'disabled'}>${ic('check')}${qt ? 'Ghi nhận' : 'Gửi đăng ký'} ${ok.length} PO hợp lệ</button>`}</div>`, 'lg');
}
async function guiExcelPo() {
  const I = S.imp; if (!I || I.hd !== S.hdId) return;
  const ds = I.ds.filter(x => !x.loi.length), kq = { tong: ds.length, xong: 0, thanh: 0, loi: [], dang: true };
  veNhapExcel(kq);
  for (const x of ds) {
    try { await rpc('dang_ky_po', { p_hd: I.hd, p: x.p }); kq.thanh++; x.loi = []; x.canh = [...x.canh.filter(c => !/^Đã gửi/.test(c))]; }
    catch (e) { kq.loi.push({ dong: x.dong, so: x.p.so_po, msg: e.message }); }
    kq.xong++; if (kq.xong % 5 === 0 || kq.xong === kq.tong) veNhapExcel(kq);
  }
  kq.dang = false; veNhapExcel(kq);
  toast(`Đã ${isQT() ? 'ghi nhận' : 'gửi'} ${kq.thanh}/${kq.tong} PO`, !!kq.loi.length);
  S.imp = null; S.form = null;
  try { await lamMoi(); } catch (e) {}
  if (!kq.loi.length) S.tab = 'po';
  const html = $('#modal').innerHTML; render(); $('#modal').innerHTML = html;
}

/* ---------- Chi tiết / sửa PO ---------- */
function dtOpts(cur) {
  const L = dsDoiTac(curHd()), cu = (cur || '').trim();
  return (cu && !L.includes(cu) ? `<option value="${esc(cu)}" selected>${esc(cu)} (tên cũ – nên chọn lại)</option>` : (cu ? '' : '<option value="">– Chọn đối tác –</option>'))
    + L.map(d => `<option ${d === cu ? 'selected' : ''}>${esc(d)}</option>`).join('');
}
async function xemPo(id) {
  const p = S.po.find(x => x.id === Number(id)); if (!p) return;
  const qt = isQT(), sua = qt || true, tinh = S.th.find(x => x.tinh_ma === p.tinh_ma);
  const canWithdraw = !qt && ['cho_duyet', 'tu_choi'].includes(p.trang_thai);
  openModal(`<div class="mh"><div><div class="eyebrow">${p.tinh_ma} – ${esc(tinh ? tinh.ten : '')} · <span class="pill ${TT[p.trang_thai][0]}">${TT[p.trang_thai][1]}</span></div><h2 class="mono" style="overflow-wrap:anywhere;margin-top:4px">${esc(p.so_po)}</h2></div><button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button></div>
  <div class="mb">
    ${p.trang_thai === 'tu_choi' ? `<div class="note k-crit"><b>Lý do từ chối:</b> ${esc(p.ly_do_tu_choi)}${!qt ? '<br>Sửa thông tin rồi bấm "Lưu và gửi lại".' : ''}</div>` : ''}
    <form id="poEdit" class="stack" novalidate>
      <div class="row">
        <div class="fg"><label for="e_so">Số P/O</label><input type="text" id="e_so" value="${esc(p.so_po)}"></div>
        <div class="fg"><label for="e_ngay">Ngày ký</label><input type="date" id="e_ngay" value="${esc(p.ngay_ky || '')}" max="${today()}"></div>
        <div class="fg"><label for="e_lct">Loại công trình</label><input type="text" id="e_lct" value="${esc(p.loai_ct || '')}" list="dlLct"><datalist id="dlLct">${(LOAI_CT[S.loai] || []).map(t => `<option value="${t}">`).join('')}</datalist></div>
      </div>
      <div class="fg"><label for="e_dt">Đối tác</label><select id="e_dt">${dtOpts(p.doi_tac)}</select></div>
      <div class="fg"><label for="e_nd">Nội dung</label><textarea id="e_nd" rows="3">${esc(p.noi_dung || '')}</textarea></div>
      <div class="row">
        <div class="fg"><label for="e_gt">Giá trị chưa VAT (đ)</label><input type="text" inputmode="numeric" id="e_gt" value="${fmt(p.gt_truoc_vat)}"></div>
        <div class="fg"><label for="e_vat">VAT (đ)</label><input type="text" inputmode="numeric" id="e_vat" value="${fmt(p.vat)}"></div>
        <div class="fg"><label>Gồm VAT (đ)</label><input type="text" id="e_tong" value="${fmt(p.gt_gom_vat)}" readonly></div>
      </div>
      <div class="row">
        <div class="fg"><label for="e_qt">Giá trị quyết toán gồm VAT (đ)</label><input type="text" inputmode="numeric" id="e_qt" value="${fmt(p.gt_quyet_toan)}" placeholder="Nhập khi đã quyết toán"></div>
        <div class="fg"><label for="e_td">Tiến độ</label><select id="e_td">${[...new Set([p.tien_do, ...TIEN_DO])].map(t => `<option ${p.tien_do === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></div>
        <div class="fg"><label for="e_sl">Số lượng trạm/tuyến</label><input type="number" id="e_sl" value="${esc(p.so_luong ?? '')}"></div>
      </div>
    </form>
    <dl class="kv"><dt>Người nhập</dt><dd>${esc(p.nguoi_tao || '')}</dd><dt>Nguồn</dt><dd>${esc(p.nguon)}</dd><dt>Gửi lúc</dt><dd>${dmyhm(p.created_at)}</dd>
      ${p.duyet_boi ? `<dt>${p.trang_thai === 'tu_choi' ? 'Từ chối bởi' : 'Duyệt bởi'}</dt><dd>${esc(p.duyet_boi)}${p.duyet_luc ? ' · ' + dmyhm(p.duyet_luc) : ''}</dd>` : ''}</dl>
    ${qt && p.trang_thai !== 'tu_choi' ? `<div class="fg"><label for="e_ly">Lý do từ chối (bắt buộc khi từ chối)</label><input type="text" id="e_ly" placeholder="VD: Sai số P/O, đề nghị kiểm tra lại"></div>` : ''}
    <div><h3 style="margin-bottom:6px">Lịch sử</h3><div class="hist" id="e_hist"><span class="muted small">Đang tải…</span></div></div>
    <div id="e_confirm"></div>
  </div>
  <div class="mf">
    ${qt ? `<button class="btn danger" data-act="xoaPo" data-v="${p.id}">${ic('trash')}Xóa</button>` : canWithdraw ? `<button class="btn danger" data-act="xoaPo" data-v="${p.id}">${ic('trash')}Rút PO</button>` : ''}
    <span style="flex:1"></span>
    ${qt && p.trang_thai !== 'tu_choi' ? `<button class="btn danger" data-act="tuChoi" data-v="${p.id}">${ic('x')}Từ chối</button>` : ''}
    <button class="btn" data-act="luuPo" data-v="${p.id}">${ic('edit')}${!qt && p.trang_thai === 'tu_choi' ? 'Lưu và gửi lại' : 'Lưu thay đổi'}</button>
    ${qt && p.trang_thai !== 'da_duyet' ? `<button class="btn ok" data-act="duyet1" data-v="${p.id}">${ic('check')}Duyệt</button>` : ''}
  </div>`);
  const upd = () => { $('#e_tong').value = fmt(digits($('#e_gt').value) + digits($('#e_vat').value)); };
  $('#e_gt').addEventListener('input', upd); $('#e_vat').addEventListener('input', upd);
  try {
    const h = await rpc('lich_su_po', { p_po: p.id });
    $('#e_hist').innerHTML = h.map(x => `<div><b>${esc(x.hanh_dong)}</b> · ${esc(x.nguoi)} · <span class="muted">${dmyhm(x.thoi_gian)}</span><br><span class="muted">${esc(x.chi_tiet)}</span></div>`).join('') || '<span class="muted small">Chưa có</span>';
  } catch (e) { $('#e_hist').innerHTML = `<span class="muted small">${esc(e.message)}</span>`; }
}
function docSuaPo() {
  return { so_po: $('#e_so').value.trim(), ngay_ky: $('#e_ngay').value, loai_ct: $('#e_lct').value, doi_tac: $('#e_dt').value, noi_dung: $('#e_nd').value,
    gt_truoc_vat: digits($('#e_gt').value), vat: digits($('#e_vat').value), gt_quyet_toan: $('#e_qt').value.trim() ? digits($('#e_qt').value) : '', tien_do: $('#e_td').value, so_luong: $('#e_sl').value };
}

/* ---------- Hạn mức (quản trị) ---------- */
function vHanMuc() {
  if (!S.pbLoaded) { S.pbLoaded = true; taiPb(); return `<div class="card empty">Đang tải các phiên bản hạn mức…</div>`; }
  if (!S.pbs.length) return `<div class="card empty">HĐ chưa có phiên bản hạn mức. <button class="btn sm" data-act="pbMoi">Tạo dự thảo</button></div>`;
  const hd = curHd(), b = S.pbs.find(x => x.id === S.pbId) || S.pbs[0];
  const edit = b.trang_thai === 'du_thao';
  const ap = S.pbs.find(x => x.trang_thai === 'ap_dung');
  const curMap = Object.fromEntries(rows().map(x => [x.ma, x]));
  const tag = t => t === 'ap_dung' ? '<span class="pill k-ok">Đang áp dụng</span>' : t === 'du_thao' ? '<span class="pill k-warn">Dự thảo</span>' : '<span class="pill k-none">Hết hiệu lực</span>';
  const rws = (S.pbRows || []).map(r => { const v = S.pbEdit[r.tinh_ma] ?? Number(r.han_muc); const c = curMap[r.tinh_ma]; return { ma: r.tinh_ma, ten: r.ten, kv: r.kv, v, cur: c ? c.hm : 0, dk: c ? c.dk : 0 }; });
  return `<div class="card stack">
    <div class="card-h" style="margin:0"><h2>Phiên bản hạn mức</h2><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-act="pbMoi">${ic('plus')}Tạo dự thảo mới</button></div></div>
    <div class="pbs">${S.pbs.map(x => `<button class="pbcard" data-act="pbChon" data-v="${x.id}" aria-pressed="${x.id === b.id}"><b>${esc(x.ten)}</b><span class="small muted">${x.ngay_hieu_luc ? 'Hiệu lực ' + dmy(x.ngay_hieu_luc) : 'Tạo ' + dmy(x.created_at)}</span><span>${tag(x.trang_thai)} <span class="small num">${ty(x.tong)}</span></span></button>`).join('')}</div>
  </div>
  <div class="card stack">
    <div class="row">
      <div class="fg"><label for="pb_ten">Tên phiên bản</label><input type="text" id="pb_ten" value="${esc(b.ten)}" ${edit ? '' : 'readonly'}></div>
      <div class="fg" style="grid-column:span 2"><label for="pb_cc">Căn cứ</label><input type="text" id="pb_cc" value="${esc(b.can_cu || '')}" ${edit ? '' : 'readonly'} placeholder="Số, ngày thông báo điều chỉnh"></div>
      <div class="fg"><label for="pb_ng">Ngày hiệu lực</label><input type="date" id="pb_ng" value="${esc(b.ngay_hieu_luc || '')}" ${edit ? '' : 'readonly'}></div>
    </div>
    <div class="sumline" id="pb_sum"></div>
    <div class="actions">${edit ? `<button class="btn danger" data-act="pbXoa">${ic('trash')}Xóa dự thảo</button><span style="flex:1"></span><button class="btn" data-act="pbDan">${ic('paste')}Dán từ Excel</button><button class="btn" data-act="pbLuu">${ic('edit')}Lưu dự thảo</button><button class="btn primary" data-act="pbBanHanh">${ic('check')}Ban hành</button>` : `<span class="muted small">${b.trang_thai === 'ap_dung' ? 'Phiên bản đang áp dụng. Muốn thay đổi, tạo dự thảo mới (sao chép từ bản này).' : 'Phiên bản đã hết hiệu lực, chỉ xem.'}</span>`}</div>
  </div>
  ${S.pbRows ? `<div class="tbl"><table><thead><tr><th>Mã</th><th>Viettel tỉnh/TP</th><th>KV</th><th class="num">Đã ký PO (đ)</th><th class="num">HM đang áp dụng (đ)</th><th class="num">HM phiên bản này (đ)</th><th class="num">Chênh lệch (đ)</th><th class="num">Tỷ lệ theo bản này</th></tr></thead>
  <tbody>${rws.map(r => { const d = r.v - r.cur; return `<tr><td><b>${r.ma}</b></td><td>${esc(r.ten)}</td><td>${r.kv}</td><td class="num">${fmt(r.dk)}</td><td class="num">${fmt(r.cur)}</td>
    <td class="num">${edit ? `<input type="text" inputmode="numeric" class="hm-in" data-hm="${r.ma}" value="${fmt(r.v)}" aria-label="Hạn mức ${r.ma}">` : fmt(r.v)}</td>
    <td class="num ${d > 0 ? 'delta-p' : d < 0 ? 'delta-n' : 'muted'}" data-dl="${r.ma}">${d ? (d > 0 ? '+' : '') + fmt(d) : '–'}</td>
    <td><div class="pct" data-pc="${r.ma}">${bar(r.dk, r.v)}<span>${r.v ? pctf(r.dk / r.v) : '—'}</span></div></td></tr>`; }).join('')}</tbody></table></div>` : '<div class="card empty">Đang tải…</div>'}`;
}
function veTongPb() {
  const hd = curHd(); if (!S.pbRows || !$('#pb_sum')) return;
  const tong = S.pbRows.reduce((a, r) => a + (S.pbEdit[r.tinh_ma] ?? Number(r.han_muc)), 0);
  const tran = Math.round(hd.gia_tri * hd.ty_le_han_muc);
  $('#pb_sum').innerHTML = `<span>Tổng phiên bản: <b>${fmt(tong)}</b> đ</span><span>Giá trị HĐ: <b>${fmt(hd.gia_tri)}</b> đ</span>
    <span>Mức phân bổ thông thường (${pctf(Number(hd.ty_le_han_muc))}): <b>${fmt(tran)}</b> đ</span>
    <span>Chưa phân bổ: <b>${fmt(hd.gia_tri - tong)}</b> đ</span>
    <span class="pill ${tong > hd.gia_tri ? 'k-crit' : tong > tran ? 'k-warn' : 'k-ok'}">${tong > hd.gia_tri ? 'Vượt giá trị HĐ, không ban hành được' : tong > tran ? 'Đã dùng cả phần dự phòng' : 'Cân đối'}</span>`;
}
async function taiPb(chon) {
  try {
    S.pbs = await rpc('ds_pb', { p_hd: S.hdId });
    if (!S.pbs.length) { render(); return; }
    S.pbId = chon || S.pbId || (S.pbs.find(x => x.trang_thai === 'du_thao') || S.pbs.find(x => x.trang_thai === 'ap_dung') || S.pbs[0]).id;
    S.pbEdit = {}; S.pbRows = await rpc('tong_hop', { p_hd: S.hdId, p_pb: S.pbId });
  } catch (e) { toast(e.message, true); }
  render();
}
async function luuPb() {
  const p_info = { ten: $('#pb_ten').value, can_cu: $('#pb_cc').value, ngay_hieu_luc: $('#pb_ng').value };
  const p_gia_tri = Object.fromEntries(S.pbRows.map(r => [r.tinh_ma, S.pbEdit[r.tinh_ma] ?? Number(r.han_muc)]));
  await rpc('luu_pb', { p_pb: S.pbId, p_info, p_gia_tri });
}

/* ---------- HĐ khung ---------- */
function vHd() {
  const L = [...S.hds].sort((a, b) => b.nam - a.nam || a.loai.localeCompare(b.loai));
  return `<div class="toolbar"><span class="muted small">Mỗi HĐ khung có hạn mức, PO và báo cáo riêng; không cộng chung giữa các HĐ.</span><button class="btn sm primary" data-act="hdMoi">${ic('plus')}Thêm HĐ khung</button></div>
  <div class="tbl"><table><thead><tr><th>Loại</th><th>Năm</th><th>Số HĐ</th><th>Tên HĐ</th><th>Đối tác</th><th>Ngày ký</th><th>Hết hạn</th><th class="num">Giá trị (đ)</th><th>Hạn mức áp dụng</th><th>Trạng thái</th></tr></thead>
  <tbody>${L.map(h => `<tr class="click" data-act="hdSua" data-v="${h.id}"><td style="white-space:nowrap">${ic(LOAI[h.loai].ic)} ${LOAI[h.loai].ngan}</td><td>${h.nam}</td><td class="mono">${esc(h.so_hd)}</td><td><div class="nd">${esc(h.ten)}</div></td><td>${esc(h.doi_tac || '')}</td>
    <td>${dmy(h.ngay_ky)}</td><td>${dmy(h.ngay_het_han) || '<span class="pill k-warn">Chưa nhập</span>'}</td><td class="num">${fmt(h.gia_tri)}</td><td>${h.pb ? esc(h.pb.ten) : '<span class="pill k-warn">Chưa ban hành</span>'}</td>
    <td>${h.trang_thai === 'dang_thuc_hien' ? '<span class="pill k-ok">Đang thực hiện</span>' : '<span class="pill k-none">Đã kết thúc</span>'}</td></tr>`).join('') || '<tr><td colspan="10" class="empty">Chưa có HĐ khung</td></tr>'}</tbody></table></div>`;
}
function hdForm(h) {
  const n = new Date().getFullYear();
  h = h || { loai: S.loai, nam: n, so_hd: '', ten: '', doi_tac: '', ngay_ky: '', ngay_het_han: '', gia_tri: '', ty_le_han_muc: 0.95, tu_dong_duyet: false, trang_thai: 'dang_thuc_hien', ghi_chu: '' };
  openModal(`<div class="mh"><h2>${h.id ? 'Sửa HĐ khung' : 'Thêm HĐ khung'}</h2><button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button></div>
  <form class="mb" id="hdF" novalidate>
    <div class="row">
      <div class="fg"><label for="h_loai">Loại HĐ</label><select id="h_loai">${Object.entries(LOAI).map(([k, v]) => `<option value="${k}" ${h.loai === k ? 'selected' : ''}>${v.ten}</option>`).join('')}</select></div>
      <div class="fg"><label for="h_nam">Năm</label><input type="number" id="h_nam" value="${h.nam}" min="2020" max="2100"></div>
      <div class="fg"><label for="h_tt">Trạng thái</label><select id="h_tt"><option value="dang_thuc_hien" ${h.trang_thai === 'dang_thuc_hien' ? 'selected' : ''}>Đang thực hiện</option><option value="da_ket_thuc" ${h.trang_thai === 'da_ket_thuc' ? 'selected' : ''}>Đã kết thúc</option></select></div>
    </div>
    <div class="fg"><label for="h_so">Số HĐ / Thỏa thuận khung</label><input type="text" id="h_so" value="${esc(h.so_hd)}"></div>
    <div class="fg"><label for="h_ten">Tên HĐ</label><input type="text" id="h_ten" value="${esc(h.ten)}"></div>
    <div class="fg"><label for="h_dt">Đối tác (tên chung, VD: Liên danh VCC-ACT)</label><input type="text" id="h_dt" value="${esc(h.doi_tac || '')}"></div>
    <div class="fg"><label for="h_dsdt">Danh sách đối tác được ký PO (mỗi dòng một đối tác)</label><textarea id="h_dsdt" rows="3" placeholder="Tổng Công ty Cổ phần Công trình Viettel&#10;Công ty Cổ phần Viễn thông ACT">${esc((h.ds_doi_tac || []).join('\n'))}</textarea><span class="hint">Tỉnh chỉ chọn được đối tác trong danh sách này khi đăng ký PO.</span></div>
    <div class="row">
      <div class="fg"><label for="h_nk">Ngày ký</label><input type="date" id="h_nk" value="${esc(h.ngay_ky || '')}"></div>
      <div class="fg"><label for="h_hh">Ngày hết hiệu lực</label><input type="date" id="h_hh" value="${esc(h.ngay_het_han || '')}"></div>
    </div>
    <div class="row">
      <div class="fg"><label for="h_gt">Giá trị HĐ gồm VAT (đ)</label><input type="text" inputmode="numeric" id="h_gt" value="${fmt(h.gia_tri)}"></div>
      <div class="fg"><label for="h_tl">Tỷ lệ phân bổ hạn mức (%)</label><input type="number" id="h_tl" value="${Math.round(Number(h.ty_le_han_muc) * 1000) / 10}" step="0.1" min="0" max="100"><span class="hint">Phần còn lại là dự phòng</span></div>
    </div>
    <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="h_auto" ${h.tu_dong_duyet ? 'checked' : ''}> Tự động duyệt PO của tỉnh nếu còn trong hạn mức</label>
    <div class="fg"><label for="h_gc">Ghi chú</label><textarea id="h_gc" rows="2">${esc(h.ghi_chu || '')}</textarea></div>
    ${h.id ? '' : '<div class="note k-info">HĐ mới được tạo kèm một dự thảo hạn mức bằng 0 cho 34 tỉnh. Nhập hạn mức ở mục Hạn mức rồi ban hành.</div>'}
  </form>
  <div class="mf"><button class="btn" data-act="closeModal">Hủy</button><button class="btn primary" data-act="hdLuu" data-v="${h.id || ''}">${ic('check')}Lưu</button></div>`);
}

/* ---------- Tài khoản & tỉnh ---------- */
function vTaiKhoan() {
  if (!S.tk) { rpc('ds_tai_khoan').then(r => { S.tk = r; render(); }).catch(e => toast(e.message, true)); return `<div class="card empty">Đang tải…</div>`; }
  const chuaDoi = S.tk.filter(a => a.mk_ban_dau).length;
  return `<div class="toolbar"><span class="muted small">Tên đăng nhập của tỉnh là mã tỉnh. Mật khẩu ban đầu hiển thị cho P.QLHT đến khi tỉnh đổi mật khẩu (bắt buộc ở lần đăng nhập đầu). ${chuaDoi} tài khoản chưa đổi.</span>
    <button class="btn sm primary" data-act="xuatTk">${ic('download')}Xuất danh sách tài khoản</button></div>
  <div class="tbl"><table><thead><tr><th>Tên đăng nhập</th><th>Đơn vị</th><th>KV</th><th>Email nhận thông báo</th><th>Mật khẩu ban đầu</th><th>Tình trạng</th><th>Đăng nhập gần nhất</th><th></th></tr></thead>
  <tbody>${S.tk.map(a => `<tr><td><b>${esc(a.ten_dn)}</b></td><td>${esc(a.vai_tro === 'tinh' ? 'Viettel ' + a.tinh_ten : a.ho_ten || 'Quản trị')}</td><td>${a.kv || ''}</td>
    <td>${a.vai_tro === 'tinh' ? `<input type="email" data-email="${a.tinh_ma}" value="${esc(a.email || '')}" placeholder="email@…" style="width:230px" aria-label="Email ${a.tinh_ma}">` : '<span class="muted small">Cấu hình ở mục Cấu hình</span>'}</td>
    <td>${a.mk_ban_dau ? `<span class="mono" style="font-size:13px">${esc(a.mk_ban_dau)}</span> <button class="btn sm" data-act="copyMk" data-v="${esc(a.mk_ban_dau)}" title="Sao chép">Chép</button>` : '<span class="muted small">—</span>'}</td>
    <td>${!a.co_mk ? '<span class="pill k-warn">Chưa cấp</span>' : a.phai_doi_mk ? '<span class="pill k-warn">Chưa đổi MK</span>' : '<span class="pill k-ok">Đã đổi MK</span>'}${a.khoa ? ' <span class="pill k-crit">Đang khóa</span>' : ''}</td>
    <td>${a.dang_nhap_cuoi ? dmyhm(a.dang_nhap_cuoi) : '<span class="muted">Chưa</span>'}</td>
    <td style="white-space:nowrap">${a.ten_dn !== S.user.ten_dn ? `<button class="btn sm" data-act="capMk" data-v="${esc(a.ten_dn)}">${ic('key')}${a.co_mk ? 'Đặt lại MK' : 'Cấp MK'}</button> <button class="btn sm ${a.khoa ? '' : 'danger'}" data-act="khoaTk" data-v="${esc(a.ten_dn)}" data-k="${a.khoa ? 0 : 1}">${a.khoa ? 'Mở khóa' : 'Khóa'}</button>` : '<span class="muted small">Tài khoản đang dùng</span>'}</td></tr>`).join('')}</tbody></table></div>`;
}
function matKhauNgauNhien() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789', buf = new Uint32Array(10); crypto.getRandomValues(buf);
  return Array.from(buf, x => a[x % a.length]).join('');
}

/* ---------- Nhật ký & cấu hình ---------- */
function vNhatKy() {
  if (!S.nk) { rpc('ds_nhat_ky', { p_hd: S.hdId, p_gioi_han: 1000 }).then(r => { S.nk = r; render(); }).catch(e => toast(e.message, true)); return `<div class="card empty">Đang tải…</div>`; }
  const q = S.nkQ.toLowerCase(), L = q ? S.nk.filter(x => `${x.nguoi} ${x.hanh_dong} ${x.chi_tiet} ${x.tinh_ma}`.toLowerCase().includes(q)) : S.nk;
  return `<div class="toolbar"><input type="search" id="fNk" data-f="nkQ" value="${esc(S.nkQ)}" placeholder="Tìm trong nhật ký…" style="width:260px" aria-label="Tìm trong nhật ký"><span class="muted small">${L.length} dòng (tối đa 1.000 dòng gần nhất)</span></div>
  <div class="tbl"><table><thead><tr><th>Thời gian</th><th>Tỉnh</th><th>Người thực hiện</th><th>Hành động</th><th>Chi tiết</th></tr></thead>
  <tbody>${L.slice(0, 400).map(x => `<tr><td style="white-space:nowrap">${dmyhm(x.thoi_gian)}</td><td>${esc(x.tinh_ma || '')}</td><td>${esc(x.nguoi)}</td><td><b>${esc(x.hanh_dong)}</b></td><td style="overflow-wrap:anywhere;max-width:560px">${esc(x.chi_tiet)}</td></tr>`).join('')}</tbody></table></div>`;
}
function vCauHinh() {
  if (!S.ch) { rpc('lay_cau_hinh').then(r => { S.ch = r; render(); }).catch(e => toast(e.message, true)); return `<div class="card empty">Đang tải…</div>`; }
  return `<form class="card stack" id="chF" style="max-width:760px" novalidate><h2>Thông báo email</h2>
    <div class="fg"><label for="c_em">Email P.QLHT nhận thông báo (cách nhau dấu phẩy)</label><input type="text" id="c_em" value="${esc(S.ch.email_quan_tri || '')}"><span class="hint">Nhận email khi tỉnh đăng ký/sửa PO, tổng hợp tuần và cảnh báo hạn mức.</span></div>
    <div class="fg"><label for="c_dm">Đầu mối hỗ trợ (in cuối email)</label><input type="text" id="c_dm" value="${esc(S.ch.dau_moi || '')}"></div>
    <div class="fg"><label for="c_url">Địa chỉ trang web (gắn vào email)</label><input type="text" id="c_url" value="${esc(S.ch.app_url || location.origin)}"></div>
    <div class="actions"><button class="btn primary" type="submit">${ic('check')}Lưu cấu hình</button></div></form>
  <div class="card stack" style="max-width:760px"><h2>Lịch gửi email tự động</h2>
    <div class="small">• Có PO đăng ký mới / tỉnh sửa PO: gửi P.QLHT trong vòng 10 phút.<br>• PO được duyệt hoặc bị từ chối: gửi email tỉnh (nếu đã khai báo).<br>• Cảnh báo hạn mức khi tỉnh đạt 80% và 100%: kiểm tra 7h30 hằng ngày, mỗi mốc gửi một lần.<br>• Tổng hợp tuần: 8h00 sáng thứ Hai, gửi P.QLHT và các tỉnh có email.</div></div>`;
}

/* ---------- Xuất Excel theo mẫu PO Manager ---------- */
async function xuatExcel() {
  if (!window.ExcelJS) return toast('Chưa tải được thư viện Excel, kiểm tra kết nối mạng', true);
  const hd = curHd(), qt = isQT(), ten = LOAI[hd.loai].ngan;
  let emails = {};
  if (qt) { if (!S.tk) S.tk = await rpc('ds_tai_khoan'); S.tk.forEach(a => { if (a.tinh_ma) emails[a.tinh_ma] = a.email || ''; }); }
  const wb = new ExcelJS.Workbook(); wb.creator = 'PO Manager – P.QLHT'; wb.created = new Date();
  const F = { name: 'Arial', size: 10 };
  const fill = c => ({ type: 'pattern', pattern: 'solid', fgColor: { argb: c } });
  const border = { top: { style: 'thin', color: { argb: 'FFBDBDBD' } }, left: { style: 'thin', color: { argb: 'FFBDBDBD' } }, bottom: { style: 'thin', color: { argb: 'FFBDBDBD' } }, right: { style: 'thin', color: { argb: 'FFBDBDBD' } } };
  const dt = s => s ? new Date(s + 'T00:00:00Z') : null;
  const N = v => (v == null || v === '' || !isFinite(Number(v))) ? null : Number(v);
  const hdr = ['STT', 'Viettel\ntỉnh/TP', 'Số Hợp đồng VTNet', 'Số P/O Viettel tỉnh ký', 'Loại\ncông trình', 'Nội dung P/O', 'Tên đối tác', 'Ngày ký P/O', 'Giá trị P/O\n(chưa VAT)', 'VAT', 'Giá trị P/O\n(đã gồm VAT)', 'Giá trị QT P/O\n(đã gồm VAT)', 'Tiến độ thực hiện\n(Đã QT/Đã NT/Chưa NT/Hủy)', 'Số lượng\ntrạm/tuyến'];
  const widths = [5.63, 6.63, 27.63, 29.5, 9.13, 33.88, 27, 11.13, 15.13, 13.25, 15.13, 16.38, 20.75, 9.88];
  function sheetPO(name, title, list, extra) {
    const ws = wb.addWorksheet(name, { views: [{ state: 'frozen', xSplit: 2, ySplit: 4 }] });
    const cols = extra ? [...hdr, 'Trạng thái', 'Lý do từ chối', 'Người nhập', 'Gửi lúc'] : hdr;
    ws.columns = cols.map((h, i) => ({ width: widths[i] || 18 }));
    ws.mergeCells(1, 1, 1, cols.length);
    const c1 = ws.getCell(1, 1); c1.value = title; c1.font = { ...F, size: 13, bold: true, color: { argb: 'FFFFFFFF' } }; c1.fill = fill('FF1565C0'); c1.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 26;
    ws.getCell(2, 1).value = 'Cập nhật:'; ws.getCell(2, 1).font = { ...F, bold: true };
    ws.getCell(2, 2).value = new Date(); ws.getCell(2, 2).numFmt = 'dd/mm/yyyy hh:mm'; ws.getCell(2, 2).font = F;
    ws.getCell(2, 4).value = `Số HĐ: ${hd.so_hd}`; ws.getCell(2, 4).font = { ...F, italic: true };
    const r3 = ws.getRow(3); cols.forEach((h, i) => { const c = r3.getCell(i + 1); c.value = h; c.font = { ...F, bold: true, color: { argb: 'FFFFFFFF' } }; c.fill = fill('FF1565C0'); c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; c.border = border; });
    r3.height = 39;
    const n = list.length, last = 4 + Math.max(n, 1);
    const r4 = ws.getRow(4);
    r4.getCell(1).value = 'TỔNG';
    for (let c = 2; c <= 8; c++) { const L = String.fromCharCode(64 + c); r4.getCell(c).value = { formula: `COUNTA(${L}5:${L}${last})`, result: n }; }
    const sum = k => list.reduce((a, p) => a + (N(p[k]) || 0), 0);
    [['I', 9, 'gt_truoc_vat'], ['J', 10, 'vat'], ['K', 11, 'gt_gom_vat'], ['L', 12, 'gt_quyet_toan'], ['N', 14, 'so_luong']].forEach(([L, c, k]) => { r4.getCell(c).value = { formula: `SUM(${L}5:${L}${last})`, result: sum(k) }; r4.getCell(c).numFmt = '#,##0'; });
    cols.forEach((h, i) => { const c = r4.getCell(i + 1); c.font = { ...F, bold: true, color: { argb: 'FF0D47A1' } }; c.fill = fill('FFE3F2FD'); c.alignment = { horizontal: i >= 8 && i <= 13 && i !== 12 ? 'right' : 'center', vertical: 'middle' }; c.border = border; });
    list.forEach((p, i) => {
      const vals = [i + 1, p.tinh_ma, hd.so_hd, p.so_po, p.loai_ct, p.noi_dung, p.doi_tac, dt(p.ngay_ky), N(p.gt_truoc_vat), N(p.vat), N(p.gt_gom_vat), N(p.gt_quyet_toan), p.tien_do, N(p.so_luong)];
      if (extra) vals.push(TT[p.trang_thai][1], p.ly_do_tu_choi || '', p.nguoi_tao || '', p.created_at ? new Date(p.created_at) : null);
      const r = ws.getRow(5 + i);
      vals.forEach((v, j) => { const c = r.getCell(j + 1); c.value = v; c.font = F; c.fill = fill('FFF5F9FF'); c.border = border;
        c.alignment = { vertical: 'middle', horizontal: [5, 6, 3].includes(j) ? 'left' : (j >= 8 && j <= 11) || j === 13 ? 'right' : 'center', wrapText: [5, 6, 3].includes(j) };
        if (j >= 8 && j <= 11 || j === 13) c.numFmt = '#,##0'; if (j === 7) c.numFmt = 'dd/mm/yyyy'; if (j === 17) c.numFmt = 'dd/mm/yyyy hh:mm'; });
    });
    return ws;
  }
  const daDuyet = S.po.filter(p => p.trang_thai === 'da_duyet').sort((a, b) => String(a.ngay_ky).localeCompare(String(b.ngay_ky)) || a.id - b.id);
  const khac = S.po.filter(p => p.trang_thai !== 'da_duyet');
  const tieuDe = `TỔNG HỢP ĐƠN HÀNG (P/O) ${qt ? 'CHI NHÁNH' : 'VIETTEL ' + S.user.tinh_ten.toUpperCase()} KÝ THEO THỎA THUẬN KHUNG – HĐ ${ten.toUpperCase()} ${hd.nam} – BAN QLDAHTVT`;
  sheetPO('DS_PO', tieuDe, daDuyet, false);
  if (khac.length) sheetPO('CHO_DUYET', `P/O CHỜ DUYỆT / BỊ TỪ CHỐI – HĐ ${ten.toUpperCase()} ${hd.nam}`, khac, true);
  // HAN_MUC
  const ws = wb.addWorksheet('HAN_MUC', { views: [{ state: 'frozen', ySplit: 2 }] });
  const hcols = ['STT', 'Khu vực', 'Viettel tỉnh/TP', 'Mã tỉnh', 'Hạn mức (VNĐ)', 'Đã sử dụng (VNĐ)', 'Còn lại (VNĐ)', 'Tỷ lệ %', 'Email chi nhánh', 'Trạng thái'];
  ws.columns = [5.13, 7, 23.88, 7, 18.88, 18.88, 18.88, 10.13, 28.88, 20.13].map(w => ({ width: w }));
  ws.mergeCells('A1:J1');
  const t1 = ws.getCell('A1'); t1.value = `BẢNG QUẢN LÝ HẠN MỨC P/O – 34 CHI NHÁNH VIETTEL – HĐ ${ten.toUpperCase()} ${hd.nam}${hd.pb ? ' (' + hd.pb.ten + ')' : ''}`;
  t1.font = { ...F, size: 13, bold: true, color: { argb: 'FFFFFFFF' } }; t1.fill = fill('FF1565C0'); t1.alignment = { horizontal: 'center', vertical: 'middle' }; ws.getRow(1).height = 26;
  const r2 = ws.getRow(2); hcols.forEach((h, i) => { const c = r2.getCell(i + 1); c.value = h; c.font = { ...F, bold: true, color: { argb: 'FFFFFFFF' } }; c.fill = fill('FF1976D2'); c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; c.border = border; });
  r2.height = 30;
  const kvFill = { KV1: 'FFE8F5E9', KV2: 'FFFFF8E1', KV3: 'FFFCE4EC' };
  const rs = rows().sort((a, b) => a.tt - b.tt);
  const lastPo = 4 + Math.max(daDuyet.length, 1);
  rs.forEach((x, i) => {
    const rn = 3 + i, r = ws.getRow(rn);
    const vals = [i + 1, x.kv, x.ten, x.ma, x.hm,
      qt ? { formula: `SUMIFS(DS_PO!$K$5:$K$${lastPo},DS_PO!$B$5:$B$${lastPo},D${rn})`, result: x.dk } : x.dk,
      { formula: `E${rn}-F${rn}`, result: x.hm - x.dk }, { formula: `IFERROR(F${rn}/E${rn},0)`, result: x.hm ? x.dk / x.hm : 0 },
      qt ? (emails[x.ma] || '') : '', { formula: `IF(H${rn}>=1,"🚨 Vượt hạn mức",IF(H${rn}>=0.8,"⚠️ Sắp hết hạn mức","✅ Bình thường"))`, result: x.r >= 1 ? '🚨 Vượt hạn mức' : x.r >= 0.8 ? '⚠️ Sắp hết hạn mức' : '✅ Bình thường' }];
    vals.forEach((v, j) => { const c = r.getCell(j + 1); c.value = v; c.font = F; c.fill = fill(kvFill[x.kv] || 'FFFFFFFF'); c.border = border;
      c.alignment = { vertical: 'middle', horizontal: [2, 8, 9].includes(j) ? 'left' : j >= 4 && j <= 7 ? 'right' : 'center' };
      if (j >= 4 && j <= 6) c.numFmt = '#,##0'; if (j === 7) c.numFmt = '0.0%'; });
  });
  const tr = 3 + rs.length, rT = ws.getRow(tr);
  rT.getCell(3).value = 'TỔNG CỘNG';
  rT.getCell(5).value = { formula: `SUM(E3:E${tr - 1})`, result: rs.reduce((a, x) => a + x.hm, 0) };
  rT.getCell(6).value = { formula: `SUM(F3:F${tr - 1})`, result: rs.reduce((a, x) => a + x.dk, 0) };
  rT.getCell(7).value = { formula: `E${tr}-F${tr}`, result: rs.reduce((a, x) => a + x.hm - x.dk, 0) };
  rT.getCell(8).value = { formula: `IFERROR(F${tr}/E${tr},0)`, result: 0 };
  for (let j = 1; j <= 10; j++) { const c = rT.getCell(j); c.font = { ...F, bold: true, color: { argb: 'FF0D47A1' } }; c.fill = fill('FFE3F2FD'); c.border = border; if (j >= 5 && j <= 7) c.numFmt = '#,##0'; if (j === 8) c.numFmt = '0.0%'; }
  ws.getCell(`A${tr + 2}`).value = 'Ghi chú màu khu vực:'; ws.getCell(`A${tr + 2}`).font = { ...F, bold: true };
  ['KV1', 'KV2', 'KV3'].forEach((k, i) => { const c = ws.getCell(`A${tr + 3 + i}`); c.value = `${k} – Khu vực ${i + 1}`; c.font = F; c.fill = fill(kvFill[k]); });
  ws.getCell(`A${tr + 7}`).value = `Giá trị HĐ khung: ${fmt(hd.gia_tri)} đ · Hạn mức theo ${hd.pb ? hd.pb.ten + (hd.pb.can_cu ? ' – ' + hd.pb.can_cu : '') : '(chưa ban hành)'}`; ws.getCell(`A${tr + 7}`).font = { ...F, italic: true };
  const d = new Date(), dd = String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear();
  const fname = `PO Manager – BQLDAHTVT – HĐ ${ten} ${hd.nam}${qt ? '' : ' – ' + S.user.tinh_ma} (${dd}).xlsx`;
  const buf = await wb.xlsx.writeBuffer();
  const url = URL.createObjectURL(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const a = document.createElement('a'); a.href = url; a.download = fname; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Đã xuất ' + fname);
}

/* ---------- Đổi mật khẩu (bắt buộc lần đầu) ---------- */
function moDoiMk(batBuoc) {
  S.batBuocDoiMk = !!batBuoc;
  const canCu = !(batBuoc && S.mkTam);
  openModal(`<div class="mh"><h2>${batBuoc ? 'Đổi mật khẩu lần đầu' : 'Đổi mật khẩu'}</h2>${batBuoc ? '' : `<button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button>`}</div>
    <form class="mb" id="dmF" novalidate>
      ${batBuoc ? '<div class="note k-warn">Tài khoản đang dùng mật khẩu ban đầu do P.QLHT cấp. Đơn vị đặt mật khẩu mới để tiếp tục sử dụng phần mềm.</div>' : ''}
      ${canCu ? '<div class="fg"><label for="o_cu">Mật khẩu hiện tại</label><input type="password" id="o_cu" autocomplete="current-password"></div>' : ''}
      <div class="fg"><label for="o_moi">Mật khẩu mới (tối thiểu 8 ký tự)</label><input type="password" id="o_moi" autocomplete="new-password"></div>
      <div class="fg"><label for="o_moi2">Nhập lại mật khẩu mới</label><input type="password" id="o_moi2" autocomplete="new-password"></div></form>
    <div class="mf">${batBuoc ? `<button class="btn" data-act="logout">Đăng xuất</button>` : '<button class="btn" data-act="closeModal">Hủy</button>'}<button class="btn primary" data-act="doiMkOk">${ic('key')}Đổi mật khẩu</button></div>`, true);
}

async function xuatTaiKhoan() {
  if (!window.ExcelJS) return toast('Chưa tải được thư viện Excel', true);
  S.tk = await rpc('ds_tai_khoan');
  const wb = new ExcelJS.Workbook(), ws = wb.addWorksheet('Tai_khoan');
  const F = { name: 'Times New Roman', size: 12 }, bd = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  ws.columns = [6, 9, 30, 8, 16, 18, 32, 18].map(w => ({ width: w }));
  ws.mergeCells('A1:H1'); ws.getCell('A1').value = 'DANH SÁCH TÀI KHOẢN PHẦN MỀM PO MANAGER – 34 VIETTEL TỈNH/TP';
  ws.getCell('A1').font = { ...F, size: 14, bold: true }; ws.getCell('A1').alignment = { horizontal: 'center' };
  ws.mergeCells('A2:H2'); ws.getCell('A2').value = 'Địa chỉ: ' + location.origin + location.pathname + '  ·  Đơn vị bắt buộc đổi mật khẩu ở lần đăng nhập đầu';
  ws.getCell('A2').font = { ...F, italic: true }; ws.getCell('A2').alignment = { horizontal: 'center' };
  const h = ['STT', 'Mã tỉnh', 'Viettel tỉnh/TP', 'KV', 'Tên đăng nhập', 'Mật khẩu ban đầu', 'Email nhận thông báo', 'Tình trạng'];
  const r3 = ws.getRow(4); h.forEach((t, i) => { const c = r3.getCell(i + 1); c.value = t; c.font = { ...F, bold: true }; c.border = bd; c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } }; });
  S.tk.filter(a => a.vai_tro === 'tinh').forEach((a, i) => {
    const r = ws.getRow(5 + i);
    [i + 1, a.tinh_ma, 'Viettel ' + a.tinh_ten, a.kv, a.ten_dn, a.mk_ban_dau || '(đơn vị đã đổi)', a.email || '', a.phai_doi_mk ? 'Chưa đổi MK' : 'Đã đổi MK']
      .forEach((v, j) => { const c = r.getCell(j + 1); c.value = v; c.font = j === 5 ? { name: 'Consolas', size: 12 } : F; c.border = bd; c.alignment = { horizontal: [2, 6].includes(j) ? 'left' : 'center' }; });
  });
  const d = new Date(), dd = String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear();
  const buf = await wb.xlsx.writeBuffer(), url = URL.createObjectURL(new Blob([buf])), a = document.createElement('a');
  a.href = url; a.download = `Tài khoản PO Manager – 34 tỉnh (${dd}).xlsx`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Đã xuất danh sách tài khoản');
}

/* ---------- Modal ---------- */
function openModal(html, small) { $('#modal').innerHTML = `<div class="modal" data-act="bgModal"><div class="box ${small === 'lg' ? 'lg' : small ? 'sm' : ''}" role="dialog" aria-modal="true">${html}</div></div>`; const f = $('#modal input:not([readonly]),#modal textarea'); if (f) setTimeout(() => f.focus(), 30); }
function closeModal() { if (S.batBuocDoiMk && S.user && S.user.phai_doi_mk) return; $('#modal').innerHTML = ''; }
function xacNhan(tieuDe, noiDung, nut, fn, nguyHiem) {
  openModal(`<div class="mh"><h2>${tieuDe}</h2></div><div class="mb"><div>${noiDung}</div></div><div class="mf"><button class="btn" data-act="closeModal">Hủy</button><button class="btn ${nguyHiem ? 'danger' : 'primary'}" id="xnOk">${nut}</button></div>`, true);
  $('#xnOk').onclick = async () => { $('#xnOk').disabled = true; try { await fn(); closeModal(); } catch (e) { $('#xnOk').disabled = false; } };
}

/* ---------- Sau khi vẽ: gắn sự kiện form ---------- */
function afterRender() {
  if (S.tab === 'dangky' && $('#poForm')) {
    const form = $('#poForm');
    form.addEventListener('input', () => { docForm(); veKiemTra(); });
    form.addEventListener('change', () => { docForm(); veKiemTra(); });
    form.addEventListener('submit', e => { e.preventDefault(); guiForm(); });
    ['d_gt', 'd_vat'].forEach(id => $('#' + id).addEventListener('blur', e => { const n = digits(e.target.value); e.target.value = n ? fmt(n) : ''; }));
    docForm(); veKiemTra();
  }
  if (S.tab === 'hanmuc') veTongPb();
  if (S.tab === 'cauhinh' && $('#chF')) $('#chF').addEventListener('submit', async e => {
    e.preventDefault();
    await chay(() => rpc('luu_cau_hinh', { p: { email_quan_tri: $('#c_em').value.trim(), dau_moi: $('#c_dm').value.trim(), app_url: $('#c_url').value.trim() } }), 'Đã lưu cấu hình');
    S.ch = null; render();
  });
}

/* ---------- Xử lý thao tác ---------- */
const ACT = {
  logout: () => dangXuat(),
  tab: d => { S.tab = d.v; if (d.v !== 'dangky') S.form = null; render(); window.scrollTo({ top: 0 }); },
  loai: async d => { chonLoai(d.v); await taiHd(); },
  st: d => { S.st = S.st === d.v ? '' : d.v; render(); },
  more: () => { S.lim += 80; render(); },
  xemTinh: d => { S.f = { q: '', tinh: d.v, tt: '', td: '', lct: '' }; S.tab = 'po'; render(); },
  xemPo: d => xemPo(d.v),
  closeModal: closeModal,
  bgModal: (d, el, e) => { if (e.target === el) closeModal(); },
  excel: () => chay(xuatExcel),
  xoaForm: () => { S.form = blankForm(); render(); },
  mauExcel: () => chay(taiMauExcel),
  nhapExcel: () => { if (!window.ExcelJS) return toast('Chưa tải được thư viện Excel, kiểm tra kết nối mạng', true); $('#f_excel').click(); },
  guiExcel: () => guiExcelPo(),
  luuPo: async d => {
    await chay(() => rpc('cap_nhat_po', { p_id: Number(d.v), p: docSuaPo() }), 'Đã lưu thay đổi');
    closeModal(); await lamMoi();
  },
  duyet1: async d => {
    const ch = docSuaPo(), p = S.po.find(x => x.id === Number(d.v));
    const doi = ['so_po', 'gt_truoc_vat', 'vat', 'noi_dung', 'ngay_ky'].some(k => String(ch[k] ?? '') !== String(k === 'gt_truoc_vat' || k === 'vat' ? Number(p[k]) : (p[k] ?? '')));
    await chay(async () => { if (doi) await rpc('cap_nhat_po', { p_id: p.id, p: ch }); await rpc('duyet_po', { p_ids: [p.id] }); }, 'Đã duyệt PO');
    closeModal(); await lamMoi();
  },
  tuChoi: async d => {
    const ly = ($('#e_ly') || {}).value || '';
    if (!ly.trim()) { $('#e_ly').focus(); return toast('Nhập lý do từ chối để tỉnh biết cần sửa gì', true); }
    await chay(() => rpc('tu_choi_po', { p_id: Number(d.v), p_ly_do: ly }), 'Đã từ chối PO');
    closeModal(); await lamMoi();
  },
  xoaPo: d => {
    const p = S.po.find(x => x.id === Number(d.v));
    $('#e_confirm').innerHTML = `<div class="note k-crit">${isQT() ? 'Xóa' : 'Rút'} PO <b>${esc(p.so_po)}</b> (${fmt(p.gt_gom_vat)} đ)? Thao tác được ghi nhật ký. <button class="btn sm danger" data-act="xoaPoOk" data-v="${p.id}">Xác nhận</button></div>`;
  },
  xoaPoOk: async d => { await chay(() => rpc('xoa_po', { p_id: Number(d.v) }), isQT() ? 'Đã xóa PO' : 'Đã rút PO'); closeModal(); await lamMoi(); },
  duyetChon: () => {
    const ids = [...S.sel]; if (!ids.length) return;
    const tong = S.po.filter(p => S.sel.has(p.id)).reduce((a, p) => a + Number(p.gt_gom_vat), 0);
    xacNhan('Duyệt PO đã chọn?', `Duyệt <b>${ids.length}</b> PO, tổng <b>${fmt(tong)} đ</b>. Hệ thống gửi email báo các tỉnh.`, 'Duyệt', async () => {
      await chay(() => rpc('duyet_po', { p_ids: ids }), `Đã duyệt ${ids.length} PO`); S.sel = new Set(); await lamMoi();
    });
  },
  pbChon: async d => { S.pbId = Number(d.v); S.pbRows = null; render(); await taiPb(Number(d.v)); },
  pbMoi: () => {
    const ap = S.pbs.find(x => x.trang_thai === 'ap_dung');
    openModal(`<div class="mh"><h2>Tạo dự thảo hạn mức</h2><button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button></div>
      <div class="mb"><div class="fg"><label for="n_ten">Tên phiên bản</label><input type="text" id="n_ten" placeholder="VD: Điều chỉnh tháng 11/2026"></div>
      <div class="fg"><label for="n_cc">Căn cứ</label><input type="text" id="n_cc" placeholder="Số/ngày thông báo"></div>
      <div class="fg"><label for="n_tu">Sao chép số liệu từ</label><select id="n_tu">${S.pbs.map(x => `<option value="${x.id}" ${ap && x.id === ap.id ? 'selected' : ''}>${esc(x.ten)}</option>`).join('')}<option value="">Để trống (0 đ)</option></select></div></div>
      <div class="mf"><button class="btn" data-act="closeModal">Hủy</button><button class="btn primary" data-act="pbMoiOk">Tạo</button></div>`, true);
  },
  pbMoiOk: async () => {
    const id = await chay(() => rpc('tao_pb', { p_hd: S.hdId, p_ten: $('#n_ten').value, p_can_cu: $('#n_cc').value, p_tu_pb: $('#n_tu').value ? Number($('#n_tu').value) : null }), 'Đã tạo dự thảo');
    closeModal(); S.pbId = id; await taiPb(id);
  },
  pbLuu: async () => { await chay(luuPb, 'Đã lưu dự thảo'); await taiPb(S.pbId); },
  pbXoa: () => xacNhan('Xóa dự thảo?', 'Dự thảo hạn mức này sẽ bị xóa.', 'Xóa', async () => { await chay(() => rpc('xoa_pb', { p_pb: S.pbId }), 'Đã xóa dự thảo'); S.pbId = null; await taiPb(); }, true),
  pbBanHanh: () => {
    const b = S.pbs.find(x => x.id === S.pbId), n = S.pbRows.filter(r => (S.pbEdit[r.tinh_ma] ?? Number(r.han_muc)) !== (rows().find(x => x.ma === r.tinh_ma) || {}).hm).length;
    xacNhan('Ban hành hạn mức?', `Ban hành <b>${esc($('#pb_ten').value || b.ten)}</b>: ${n} tỉnh thay đổi so với bản đang áp dụng. Sau khi ban hành, 34 tỉnh thấy số mới ngay; bản cũ được lưu lại để tra cứu.`, 'Ban hành', async () => {
      await chay(async () => { await luuPb(); await rpc('ap_dung_pb', { p_pb: S.pbId }); }, 'Đã ban hành hạn mức mới');
      await lamMoi(); await taiPb(S.pbId);
    });
  },
  pbDan: () => {
    openModal(`<div class="mh"><h2>Dán hạn mức từ Excel</h2><button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button></div>
      <div class="mb"><div class="small muted">Dán 2 cột <b>Mã tỉnh | Hạn mức</b>, hoặc 1 cột 34 giá trị theo đúng thứ tự tỉnh như bảng.</div><textarea id="p_txt" rows="12" placeholder="HNI	36192789216&#10;HCM	18500000000"></textarea></div>
      <div class="mf"><button class="btn" data-act="closeModal">Hủy</button><button class="btn primary" data-act="pbDanOk">Áp vào bảng</button></div>`);
  },
  pbDanOk: () => {
    const lines = $('#p_txt').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const ma = S.pbRows.map(r => r.tinh_ma); let n = 0;
    if (lines.every(l => /\t|;/.test(l) || /^[A-Za-z]{2,4}\s/.test(l))) {
      lines.forEach(l => { const [k, v] = l.split(/\t|;|\s+/); const m = (k || '').toUpperCase(); if (ma.includes(m) && digits(v)) { S.pbEdit[m] = digits(v); n++; } });
    } else if (lines.length === ma.length) { lines.forEach((l, i) => { S.pbEdit[ma[i]] = digits(l); n++; }); }
    if (!n) return toast('Không đọc được dữ liệu. Kiểm tra định dạng 2 cột hoặc đủ 34 dòng.', true);
    closeModal(); render(); toast(`Đã áp ${n} tỉnh vào bảng, bấm Lưu dự thảo để lưu`);
  },
  hdMoi: () => hdForm(null),
  hdSua: d => hdForm(S.hds.find(h => h.id === Number(d.v))),
  hdLuu: async d => {
    const p = { id: d.v || '', loai: $('#h_loai').value, nam: $('#h_nam').value, so_hd: $('#h_so').value, ten: $('#h_ten').value, doi_tac: $('#h_dt').value, ngay_ky: $('#h_nk').value, ngay_het_han: $('#h_hh').value,
      gia_tri: digits($('#h_gt').value), ty_le_han_muc: (Number($('#h_tl').value) || 95) / 100, tu_dong_duyet: $('#h_auto').checked, trang_thai: $('#h_tt').value, ghi_chu: $('#h_gc').value, ds_doi_tac: $('#h_dsdt').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean) };
    const id = await chay(() => rpc('luu_hd', { p }), 'Đã lưu HĐ khung');
    closeModal(); S.hds = await rpc('ds_hd'); S.loai = p.loai; S.nam = Number(p.nam); S.hdId = id; ls.set('po_loai', p.loai); await taiHd();
  },
  capMk: d => {
    openModal(`<div class="mh"><h2>${d.v === 'PQLHT' ? 'Đặt mật khẩu' : 'Cấp mật khẩu'} cho ${esc(d.v)}</h2><button class="iconbtn" data-act="closeModal" aria-label="Đóng">${ic('x')}</button></div>
      <div class="mb"><div class="fg"><label for="m_mk">Mật khẩu mới (tối thiểu 8 ký tự)</label><div style="display:flex;gap:8px"><input type="text" id="m_mk" autocomplete="off" style="flex:1"><button class="btn" data-act="mkNgauNhien">Tạo ngẫu nhiên</button></div></div>
      <div class="note k-info">Sau khi lưu, các phiên đăng nhập cũ của tài khoản bị đăng xuất. Gửi mật khẩu cho đơn vị qua kênh nội bộ; đơn vị nên đổi mật khẩu sau lần đăng nhập đầu.</div></div>
      <div class="mf"><button class="btn" data-act="closeModal">Hủy</button><button class="btn" data-act="mkCopy">Sao chép</button><button class="btn primary" data-act="mkLuu" data-v="${esc(d.v)}">Lưu mật khẩu</button></div>`, true);
  },
  mkNgauNhien: () => { $('#m_mk').value = matKhauNgauNhien(); },
  copyMk: d => navigator.clipboard.writeText(d.v).then(() => toast('Đã sao chép mật khẩu'), () => toast('Không sao chép được, bôi đen để chép', true)),
  xuatTk: () => chay(xuatTaiKhoan),
  mkCopy: () => { const v = $('#m_mk').value; navigator.clipboard.writeText(v).then(() => toast('Đã sao chép'), () => { $('#m_mk').select(); toast('Bôi đen sẵn, nhấn Ctrl+C để sao chép'); }); },
  mkLuu: async d => { await chay(() => rpc('dat_mk_tai_khoan', { p_ten: d.v, p_mk: $('#m_mk').value }), 'Đã lưu mật khẩu cho ' + d.v); closeModal(); S.tk = null; render(); },
  khoaTk: d => xacNhan(d.k === '1' ? 'Khóa tài khoản?' : 'Mở khóa tài khoản?', `Tài khoản <b>${esc(d.v)}</b> ${d.k === '1' ? 'sẽ không đăng nhập được cho tới khi mở khóa.' : 'đăng nhập lại được.'}`, d.k === '1' ? 'Khóa' : 'Mở khóa',
    async () => { await chay(() => rpc('khoa_tai_khoan', { p_ten: d.v, p_khoa: d.k === '1' }), 'Đã cập nhật'); S.tk = null; render(); }, d.k === '1'),
  doiMk: () => moDoiMk(false),
  doiMkOk: async () => {
    if ($('#o_moi').value !== $('#o_moi2').value) return toast('Hai lần nhập mật khẩu mới không khớp', true);
    const cu = $('#o_cu') ? $('#o_cu').value : S.mkTam;
    await chay(() => rpc('doi_mat_khau', { p_cu: cu, p_moi: $('#o_moi').value }), 'Đã đổi mật khẩu');
    S.mkTam = null; if (S.user) S.user.phai_doi_mk = false; S.batBuocDoiMk = false; $('#modal').innerHTML = '';
  }
};

document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]'); if (!a) return;
  const f = ACT[a.dataset.act]; if (!f) return;
  if (a.tagName === 'BUTTON' || a.tagName === 'TR') e.preventDefault();
  if (a.dataset.act === 'bgModal') return f(a.dataset, a, e);
  Promise.resolve(f(a.dataset, a, e)).catch(() => {});
});
document.addEventListener('change', async e => {
  const t = e.target, k = t.dataset.f;
  if (k === 'nam') { S.nam = Number(t.value); chonLoai(S.loai, true); await taiHd(); }
  else if (k === 'hd') { S.hdId = Number(t.value); await taiHd(); }
  else if (k === 'hdDk') {
    const h = S.hds.find(x => x.id === Number(t.value)); if (!h) return;
    const giu = S.form; S.loai = h.loai; S.nam = h.nam; S.hdId = h.id; ls.set('po_loai', h.loai);
    await taiHd(); S.tab = 'dangky';
    if (giu) S.form = { ...giu, doi_tac: '', loai_ct: (LOAI_CT[h.loai] || ['Khác'])[0] };
    render();
  }
  else if (t.id === 'f_excel' && t.files && t.files[0]) { const fl = t.files[0]; t.value = ''; await chay(() => docExcelPo(fl)); }
  else if (k === 'kv' || k === 'sort') { S[k] = t.value; render(); }
  else if (['tinh', 'tt', 'td', 'lct'].includes(k)) { S.f[k] = t.value; S.lim = 80; render(); }
  else if (t.dataset.sel) { const id = Number(t.dataset.sel); t.checked ? S.sel.add(id) : S.sel.delete(id); render(); }
  else if (t.id === 'selAll') { const L = S.po.filter(p => p.trang_thai === 'cho_duyet'); S.sel = t.checked ? new Set(L.map(p => p.id)) : new Set(); render(); }
  else if (t.dataset.email) { try { await rpc('luu_email_tinh', { p_ma: t.dataset.email, p_email: t.value }); toast('Đã lưu email ' + t.dataset.email); } catch (err) { toast(err.message, true); } }
});
let qT;
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.f === 'q' || t.dataset.f === 'nkQ') {
    clearTimeout(qT); const v = t.value, k = t.dataset.f, id = t.id;
    qT = setTimeout(() => { if (k === 'q') { S.f.q = v; S.lim = 80; } else S.nkQ = v; render(); const s = $('#' + id); if (s) { s.focus(); s.setSelectionRange(v.length, v.length); } }, 250);
  }
  if (t.dataset.hm) {
    const m = t.dataset.hm, v = digits(t.value); S.pbEdit[m] = v;
    const r = S.pbRows.find(x => x.tinh_ma === m), c = rows().find(x => x.ma === m) || { hm: 0, dk: 0 }, d = v - c.hm;
    const dl = $(`[data-dl="${m}"]`); dl.textContent = d ? (d > 0 ? '+' : '') + fmt(d) : '–'; dl.className = 'num ' + (d > 0 ? 'delta-p' : d < 0 ? 'delta-n' : 'muted');
    $(`[data-pc="${m}"]`).innerHTML = `${bar(c.dk, v)}<span>${v ? pctf(c.dk / v) : '—'}</span>`;
    veTongPb();
  }
});
document.addEventListener('focusout', e => { if (e.target.dataset && e.target.dataset.hm) { const n = digits(e.target.value); e.target.value = fmt(n); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#modal').innerHTML) closeModal(); });

/* ---------- Khởi động ---------- */
(async () => {
  if (!S.phien) return renderLogin();
  try { await khoiDong(); } catch (e) { renderLogin(); if (e.message && !/hết hạn/.test(e.message)) toast(e.message, true); }
})();
