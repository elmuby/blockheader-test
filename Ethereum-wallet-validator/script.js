function validateAddress() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");
  output.innerHTML = "";
  const addresses = input
    .split(/[\n,]+/)
    .map((addr) => addr.trim())
    .filter(Boolean);
  window.validAddresses = [];

  addresses.forEach((address) => {
    const li = document.createElement("li");

    if (
      address.startsWith("0x") &&
      address.length === 42 &&
      /^0x[a-fA-F0-9]{40}$/.test(address)
    ) {
      li.textContent = `✅ Valid — ${address}`;
      li.className = "valid eth address";
      window.validAddresses.push(address);
    } else {
      li.textContent = `❌ Not a valid ethereum address — ${address}`;
      li.className = "invalid";
    }

    output.appendChild(li);
  });
}

function copyValid() {
  if (!window.validAddresses || window.validAddresses.length === 0) {
    alert("No valid addresses to copy.");
    return;
  }
  const text = window.validAddresses.join("\n");
  navigator.clipboard.writeText(text).then(() => {
    alert("Valid addresses copied to clipboard!");
  });
}
